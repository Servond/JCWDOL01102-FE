import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { verifyUser } from "../../app/redux/slice/userSlicer";
import ThankYou from "../../components/molecules/UserVerification/ThankYou";
import ScreenLoading from "../../components/molecules/UserVerification/ScreenLoading";
import { Box, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";

export default function UserVerification() {
  const params = useParams();
  const verifyToken = params.verifyToken;
  const dispatch = useDispatch<AppDispatch>();
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const verifyUserResp = useSelector(
    (state: RootState) => state.user.verifyUserResp
  );

  useEffect(() => {
    if (!isFetch) {
      setIsFetch(true);
      dispatch(verifyUser(verifyToken!));
    }
  }, [isFetch, dispatch, verifyToken]);

  const zoom = keyframes`
  from {transform: scale(0.95);}
  to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;

  return (
    <Box animation={animation}>
      {Object.keys(verifyUserResp!).length > 0 &&
      verifyUserResp?.statusCode === 200 ? (
        <ThankYou />
      ) : (
        <ScreenLoading />
      )}
    </Box>
  );
}
