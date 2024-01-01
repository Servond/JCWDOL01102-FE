import {
  AbsoluteCenter,
  Container,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { setAuthenticated } from "../../app/redux/slice/User/login";
import LandingPageHeader from "../../components/molecules/LandingPage/LandingPageHeader";
import MainContent from "../../components/organism/LandingPage/MainContent";
import { fetchNearestBranch } from "../../app/redux/slice/LandingPage/getNearestBranch";
import LoadingCenter from "../../components/molecules/Loading";
import LocationPermissionAlert from "../../components/molecules/LandingPage/LocationPermissionAlert";

export default function LandingPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const nearestBranchState = useSelector(
    (state: RootState) => state.nearestBranch.apiState
  );
  const dispatch = useDispatch<AppDispatch>();
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [permissionValue, setPermission] = useState<string[]>([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state !== "granted") {
          return;
        }
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
            });
          }
        );
        const { latitude, longitude } = position.coords;
        dispatch(fetchNearestBranch({ latitude, longitude }));
      } catch (e) {
        console.log(e);
      }
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (
      permissionValue[0] === permissionValue[1] ||
      permissionValue.length <= 1
    ) {
      return;
    }
    window.location.reload();
  }, [permissionValue]);

  useEffect(() => {
    const permissionListener = setInterval(async () => {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      setPermission((prev) => {
        const temp = [...prev];
        if (temp.length > 1) {
          temp.shift();
          temp.push(permission.state);
        } else {
          temp.push(permission.state);
        }

        return temp;
      });
      if (permission.state === "granted") {
        onClose();
      } else {
        onOpen();
        return;
      }
    }, 1000);
    if (!isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setAuthenticated(true));
      }
    }
    return () => clearInterval(permissionListener);
  }, [isAuthenticated, dispatch, onClose, onOpen]);

  return (
    <>
      <LocationPermissionAlert isOpen={isOpen} onClose={onClose} />
      {nearestBranchState === "pending" || nearestBranchState === "idle" ? (
        <Container>
          <AbsoluteCenter>
            <LoadingCenter />
          </AbsoluteCenter>
        </Container>
      ) : (
        <VStack w={"full"}>
          <LandingPageHeader />
          <MainContent />
        </VStack>
      )}
    </>
  );
}
