import {
  AbsoluteCenter,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import UserInfo from "../../molecules/UserManagement/UserInfo";
import UserRole from "../../atoms/UserManagement/UserRole";
import DeleteButton from "../../atoms/UserManagement/DeleteButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { fetchAdminPaginate } from "../../../app/redux/slice/User/adminManagement";
import LoadingCenter from "../../molecules/Loading";
import SearchBar from "../../atoms/UserManagement/SearchBar";
import UserNotFound from "../../molecules/UserManagement/UserNotFound";

export default function AdminTableContent() {
  const dispatch = useDispatch<AppDispatch>();
  const apiState = useSelector(
    (root: RootState) => root.userManagement.apiState
  );
  const adminUsers = useSelector(
    (root: RootState) => root.userManagement.admins
  );
  const key = useSelector((root: RootState) => root.userManagement.keySearch);

  const sortBy = useSelector((state: RootState) => state.userManagement.sortBy);
  const filterBy = useSelector(
    (state: RootState) => state.userManagement.filterBy
  );
  useEffect(() => {
    dispatch(
      fetchAdminPaginate({
        page: 1,
        limit: 10,
        sortBy,
        filterBy,
        key,
      })
    );
  }, [dispatch, sortBy, filterBy, key]);

  const contentHandle = () => {
    if (apiState === "pending") {
      return (
        <Container>
          <AbsoluteCenter>
            <LoadingCenter />
          </AbsoluteCenter>
        </Container>
      );
    } else if (apiState === "done" && adminUsers.length > 0) {
      return adminUsers.map((user, index) => {
        return (
          <Tr key={index}>
            <Td>
              <UserInfo name={user.name} email={user.email} />
            </Td>
            <Td>
              <UserRole>{user.role?.role}</UserRole>
            </Td>
            <Td>
              <Text fontSize={"16px"} fontWeight={"semibold"}>
                {!user.branch_id ? "Not Assigned" : user.branch?.name}
              </Text>
            </Td>
            <Td>
              <DeleteButton />
            </Td>
          </Tr>
        );
      });
    } else if (apiState === "done" && adminUsers.length === 0) {
      return <UserNotFound />;
    }
  };

  return (
    <TableContainer w={"full"} mt={"1rem"} maxH={"500px"} overflowY={"auto"}>
      <Table>
        <Thead bg={"thirdColor"}>
          <Tr>
            <Th>
              <SearchBar />
            </Th>
            <Th>Role</Th>
            <Th>Branch</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>{contentHandle()}</Tbody>
      </Table>
    </TableContainer>
  );
}
