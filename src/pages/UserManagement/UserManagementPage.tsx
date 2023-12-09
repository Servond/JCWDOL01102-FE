import { VStack, useToast } from "@chakra-ui/react";
import AdminTableHeader from "../../components/organism/UserMangement/AdminTableHeader";
import AdminTableContent from "../../components/organism/UserMangement/AdminTableContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { resetUpdateAdminState } from "../../app/redux/slice/Admin/userManagement/updateAdmin";
export default function UserManagementPage() {
  const response = useSelector((state: RootState) => state.updateAdmin.resp);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  useEffect(() => {
    if (Object.keys(response).length === 0) return;
    toast({
      duration: 3000,
      status: response.statusCode === 200 ? "success" : "error",
      title: "Admin Update",
      description: response.message,
      position: "top",
    });
    if (response.statusCode !== 200) {
      dispatch(resetUpdateAdminState());
    }
  }, [response, dispatch]);

  return (
    <VStack w={"full"}>
      <AdminTableHeader />
      <AdminTableContent />
    </VStack>
  );
}
