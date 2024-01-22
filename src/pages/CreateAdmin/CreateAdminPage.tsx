import {
  AbsoluteCenter,
  Container,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import AdminCreationForm from "../../components/molecules/CreateAdmin/AdminCreationForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { useEffect } from "react";
import Navigation from "../../components/molecules/BackNavigation";
import { resetUserState } from "../../app/redux/slice/userSlicer";
import { fetchBranches } from "../../app/redux/slice/Admin/userManagement/createAdmin";
import LoadingCenter from "../../components/molecules/Loading";

export default function CreateAdminPage() {
  const toast = useToast();
  const postUserResp = useSelector(
    (state: RootState) => state.user.postUserResp
  );
  const branches = useSelector(
    (state: RootState) => state.createAdmin.branches
  );
  const apiState = useSelector(
    (state: RootState) => state.createAdmin.apiState
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      postUserResp?.message === "" ||
      postUserResp === undefined ||
      Object.keys(postUserResp).length === 0
    ) {
      return;
    }
    console.log(postUserResp?.message);
    toast({
      isClosable: true,
      position: "top",
      title: "Admin Creation",
      description: postUserResp?.message,
      status: postUserResp?.statusCode === 200 ? "success" : "error",
      duration: 3000,
    });
    dispatch(resetUserState());
  }, [postUserResp, toast, dispatch]);

  useEffect(() => {
    if (branches.length > 0 || apiState === "done") return;
    dispatch(fetchBranches());
  }, []);

  return (
    <VStack h={"full"} w={"full"}>
      {apiState === "pending" ? (
        <Container>
          <AbsoluteCenter>
            <LoadingCenter />
          </AbsoluteCenter>
        </Container>
      ) : (
        <>
          <Navigation pageBefore='User List' />
          <HStack w={"full"} align={"start"} h={"full"} spacing={"1rem"}>
            <AdminCreationForm />
            {/* <UploadPhoto /> */}
          </HStack>
        </>
      )}
    </VStack>
  );
}
