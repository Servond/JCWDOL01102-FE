import { Heading, VStack } from "@chakra-ui/react";
import DrawerMenu from "../../components/molecules/LandingPage/DrawerMenu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { setAuthenticated } from "../../app/redux/slice/User/login";

export default function LandingPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(setAuthenticated(true));
      }
    }
  }, [isAuthenticated, dispatch]);
  return (
    <VStack mt={"50px"} w={"full"}>
      <Heading> Ini Landing Page</Heading>
      <DrawerMenu />
    </VStack>
  );
}
