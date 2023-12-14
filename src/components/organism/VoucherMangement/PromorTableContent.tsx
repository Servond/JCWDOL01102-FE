/* eslint-disable react-hooks/exhaustive-deps */
import {
    AbsoluteCenter,
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
    useDisclosure,
  } from "@chakra-ui/react";
  import UserInfo from "../../molecules/UserManagement/UserInfo";
  import UserRole from "../../atoms/UserManagement/UserRole";
  import DeleteButton from "../../atoms/UserManagement/DeleteButton";
  import { useEffect, useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch, RootState } from "../../../app/redux/store";
  import { fetchAdminPaginate } from "../../../app/redux/slice/Admin/userManagement/adminManagement";
  import LoadingCenter from "../../molecules/Loading";
  import SearchBar from "../../atoms/UserManagement/SearchBar";
  import UserNotFound from "../../molecules/UserManagement/UserNotFound";
  import ReactPaginate from "react-paginate";
  import { Role } from "../../../data/constants";
  import DeleteAlert from "../../molecules/UserManagement/DeleteAlert";
  import { resetDeleteAdminState } from "../../../app/redux/slice/Admin/userManagement/deleteAdmin";
  import UserBranch from "../../atoms/UserManagement/UserBranch";
  import { fetchBranches } from "../../../app/redux/slice/Admin/userManagement/createAdmin";
  import { resetUpdateAdminState } from "../../../app/redux/slice/Admin/userManagement/updateAdmin";
  
  export default function VoucherTableContent() {
    const dispatch = useDispatch<AppDispatch>();
    const alertDisclosure = useDisclosure();
    const [isScrollTop, setScrollTop] = useState<boolean>(true);
    const [selectedPage, setSelectedPage] = useState<number>(0);
    const prevSelectedPage = useRef<number>(0);
    const [adminId, setAdminId] = useState<number>(0);
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
    const totalPage = useSelector(
      (state: RootState) => state.userManagement.totalPages
    );
    const currentPage = useSelector(
      (state: RootState) => state.userManagement.currentPages
    );
    const deleteAdminResp = useSelector(
      (state: RootState) => state.deleteAdmin.resp
    );
    const deleteAdminApiState = useSelector(
      (state: RootState) => state.deleteAdmin.apiState
    );
    const updateAdminResp = useSelector(
      (state: RootState) => state.updateAdmin.resp
    );
    const updateAdminApiState = useSelector(
      (state: RootState) => state.updateAdmin.apiState
    );
    const apiBranchState = useSelector(
      (state: RootState) => state.createAdmin.apiState
    );
    useEffect(() => {
      dispatch(
        fetchAdminPaginate({
          page: prevSelectedPage.current === selectedPage ? 1 : selectedPage + 1,
          limit: 10,
          sortBy,
          filterBy,
          key,
        })
      );
      prevSelectedPage.current = selectedPage;
    }, [dispatch, sortBy, filterBy, key, selectedPage]);
  
    useEffect(() => {
      if (
        (Object.keys(deleteAdminResp).length === 0 &&
          Object.keys(updateAdminResp).length === 0) ||
        (deleteAdminResp.statusCode !== 200 &&
          updateAdminResp.statusCode !== 200) ||
        (deleteAdminApiState !== "done" && updateAdminApiState !== "done")
      )
        return;
      dispatch(
        fetchAdminPaginate({
          page: currentPage,
          limit: 10,
          sortBy,
          filterBy,
          key,
        })
      ).then(() => {
        if (Object.keys(deleteAdminResp).length > 0) {
          dispatch(resetDeleteAdminState());
        } else {
          dispatch(resetUpdateAdminState());
        }
      });
    }, [deleteAdminResp, dispatch, updateAdminResp]);
  
    useEffect(() => {
      if (adminId < 1) return;
      if (!alertDisclosure.isOpen) {
        alertDisclosure.onOpen();
      }
    }, [alertDisclosure, adminId]);
  
    useEffect(() => {
      dispatch(fetchBranches());
    }, [dispatch]);
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePageChange = (selectedItem: any) => {
      setSelectedPage(selectedItem.selected);
    };
  
    const contentHandle = () => {
      if (apiState === "done" && adminUsers.length > 0) {
        return (
          <Tbody>
            {adminUsers.map((user, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <UserInfo
                      name={user.name}
                      email={user.email}
                      role={user.role!.role}
                      id={user.id}
                    />
                  </Td>
                  <Td>
                    <UserRole>{user.role?.role}</UserRole>
                  </Td>
                  <Td>
                    <UserBranch
                      id={user.id}
                      branchId={user.branch_id}
                      branchName={user.branch?.name}
                      role={user.role?.role}
                    />
                  </Td>
                  <Td>
                    {user.role?.role === Role.BRANCH_ADMIN ? (
                      <DeleteButton onClick={() => setAdminId(user.id)} />
                    ) : (
                      <Text fontSize={"16px"} fontWeight={"semibold"}>
                        No action
                      </Text>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        );
      } else if (apiState === "done" && adminUsers.length === 0) {
        return <UserNotFound />;
      }
    };
  
    return (
      <VStack w={"full"}>
        <DeleteAlert
          isOpen={alertDisclosure.isOpen}
          onClose={() => {
            setAdminId(0);
            alertDisclosure.onClose();
          }}
          id={adminId}
        />
        <TableContainer
          w={"full"}
          mt={"1rem"}
          maxH={"450px"}
          h={"450px"}
          overflowY={"auto"}
          onScroll={(e) => {
            const scrollY = e.currentTarget.scrollTop;
            if (scrollY <= 0.1) {
              setScrollTop(true);
            } else {
              setScrollTop(false);
            }
          }}
        >
          <Table>
            <Thead
              bg={"thirdColor"}
              shadow={!isScrollTop ? "md" : "none"}
              transition={"0.1s ease"}
              position={"sticky"}
              top={0}
              zIndex={"1"}
            >
              <Tr>
                <Th>
                  <SearchBar />
                </Th>
                <Th>Role</Th>
                <Th>Branch</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            {contentHandle()}
          </Table>
          {apiState === "pending" || apiBranchState !== "done" ? (
            <AbsoluteCenter>
              <LoadingCenter />
            </AbsoluteCenter>
          ) : null}
        </TableContainer>
        <Box mt={"1rem"}>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={!totalPage ? 1 : totalPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={currentPage - 1}
          />
        </Box>
      </VStack>
    );
  }
  