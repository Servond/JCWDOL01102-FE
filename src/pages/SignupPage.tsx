import { Text, VStack } from "@chakra-ui/layout";
import SignupCaption from "../components/atoms/Signup/SignupCaption";
import CredetialInputs from "../components/molecules/Signup/CredentialInputs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/redux/store";
import { useDisclosure, useToast } from "@chakra-ui/react";
import {
  resetUserState,
  sendEmailVerification,
} from "../app/redux/slice/userSlicer";
import RedirectLoading from "../components/molecules/Signup/RedirectLoading";

export default function SignupPage() {
  const postUserResp = useSelector(
    (state: RootState) => state.user.postUserResp
  );
  const sendEmailVerificationResp = useSelector(
    (state: RootState) => state.user.sendEmailVerificationResp
  );
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (
      Object.keys(sendEmailVerificationResp!).length === 0 &&
      sendEmailVerificationResp?.statusCode !== 200
    )
      return;
    dispatch(resetUserState());
    onClose();
    navigate("/email-notice");
  }, [sendEmailVerificationResp, navigate, dispatch, onClose]);

  useEffect(() => {
    if (
      postUserResp?.message === "" ||
      postUserResp === undefined ||
      Object.keys(postUserResp).length === 0
    )
      return;
    toast({
      isClosable: true,
      position: "bottom",
      title: "User Sign Up",
      description: postUserResp?.message,
      status: postUserResp?.statusCode === 200 ? "success" : "error",
      duration: 5000,
    });

    if (postUserResp.statusCode === 200) {
      dispatch(resetUserState());
      dispatch(
        sendEmailVerification({
          email: postUserResp.data?.email,
          name: postUserResp.data?.name,
          id: postUserResp.data?.id,
        })
      );
      onOpen();
    }
  }, [postUserResp, toast, dispatch, onOpen]);

  return (
    <VStack justify={"center"} py={"1.5rem"}>
      <SignupCaption />
      <CredetialInputs />
      <Text textAlign={"center"}>
        Already have an account?{" "}
        <Text color={"primaryColor"} as={"span"} textAlign={"center"}>
          <Link to={"/login"}>Login</Link>
        </Text>
      </Text>
      <RedirectLoading onClose={onClose} isOpen={isOpen} />
    </VStack>
  );
}
