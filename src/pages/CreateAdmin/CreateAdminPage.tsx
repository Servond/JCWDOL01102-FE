import { HStack, VStack, useToast } from "@chakra-ui/react";
import AdminCreationForm from "../../components/molecules/CreateAdmin/AdminCreationForm";
import UploadPhoto from "../../components/atoms/CreateAdmin/UploadPhoto";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { fetchBranches } from "../../app/redux/slice/User/createAdmin";
import { useEffect } from "react";
import LoadingCenter from "../../components/molecules/Loading";
import Navigation from "../../components/molecules/CreateAdmin/Navigation";

export default function CreateAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const apiState = useSelector(
    (state: RootState) => state.createAdmin.apiState
  );
  const postUserResp = useSelector(
    (state: RootState) => state.user.postUserResp
  );
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (
      postUserResp?.message === "" ||
      postUserResp === undefined ||
      Object.keys(postUserResp).length === 0
    )
      return;
    toast({
      isClosable: true,
      position: "top",
      title: "Admin Creation",
      description: postUserResp?.message,
      status: postUserResp?.statusCode === 200 ? "success" : "error",
      duration: 5000,
    });
  }, [postUserResp, toast]);

  return apiState === "pending" ? (
    <LoadingCenter />
  ) : (
    <VStack h={"full"} w={"full"}>
      <Navigation />
      <HStack w={"full"} align={"start"} h={"full"} spacing={"1rem"}>
        <AdminCreationForm />
        <UploadPhoto />
      </HStack>
    </VStack>
  );
}
