/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { createCategory } from "../../../api/admin/category";
import { getCategoryPage } from "../../../app/redux/slice/Admin/category/AdminCategorySlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import ChakraTable, {
  Column,
  DataType,
} from "../../../components/atoms/Table/Table";
import Paginate from "../../../components/molecules/Paginate";
import CategoryAction from "../../../components/organism/Admin/category/CategoryAction";

interface IData extends DataType {
  id: number;
  name: string;
  totalProduct: number;
}

export default function CategoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categoryState = useSelector((state: RootState) => state.adminCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = React.useState(false);
  const [name, setName] = React.useState("");
  const [pageOffset, setPageOffset] = React.useState(1);
  const [data, setData] = React.useState<IData[]>([]);

  const handlePageChange = (selectedItem: any) => {
    setPageOffset(selectedItem.selected + 1);
  };

  const toast = useToast();
  const handleCreateCategory = async (name: string) => {
    try {
      if (name === "") {
        toast({
          title: "Failed Add Category",
          description: "Category Name Cannot Be Empty",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      const response = await createCategory(name);
      toast({
        title: "Success Add Category",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setRefresh(!refresh);
      onClose();
    } catch (error: any) {
      toast({
        title: "Failed Add Category",
        description: error?.response?.data?.message ?? "Unknown Error",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    setName("");
  };
  const [searchCategory, setSearchCategory] = useState("");
  const [searchValue] = useDebounce(searchCategory, 1000);
  useEffect(() => {
    dispatch(
      getCategoryPage({
        page: pageOffset,
        limit: 10,
        sort: "asc",
        name: searchValue,
        branchId: 1,
      })
    );
  }, [dispatch, refresh, pageOffset, searchValue]);

  useEffect(() => {
    const payload: IData[] = [];
    categoryState.pageData?.data.forEach((item) => {
      payload.push({
        id: item.id,
        name: item.name,
        totalProduct: item.totalProduct!,
        key: item.id.toString(),
      });
    });
    setData(payload);
  }, [categoryState.pageData?.data]);

  const columns: Column[] = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Item",
      dataIndex: "totalProduct",
      key: "totalProduct",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      maxWidth: "80px",
      render(_text, record) {
        return (
          <CategoryAction
            id={record.id as number}
            name={record.name as string}
            totalItem={record.totalProduct as number}
            setRefresh={() => setRefresh(!refresh)}
            key={record.id?.toString()}
          />
        );
      },
    },
  ];
  return (
    <Box maxW={"100vw"} maxH={"100vh"} overflow={"auto"} margin={"0 15px"}>
      <VStack height={"full"} width={"full"} overflow={"auto"} minW={"800px"}>
        <HStack w={"100%"} my={"15px"}>
          <Input
            placeholder='Cari Kategori'
            width={"450px"}
            onChange={(e) => setSearchCategory(e.target.value)}
            value={searchCategory}
          />
          <Spacer />
          <Button onClick={onOpen} variant={"outline"}>
            Add Category
          </Button>
        </HStack>
        <Box
          width={"full"}
          height={"full"}
          overflowX={"auto"}
          overflowY={"auto"}
        >
          <ChakraTable
            columns={columns}
            data={data}
            key={"id"}
            loading={false}
          />
        </Box>
        <Box
          display={
            (categoryState.pageData?.totalPages ?? 0) > 1 ? "flex" : "none"
          }
        >
          <Paginate
            pageCount={categoryState.pageData?.totalPages ?? 1}
            onPageChange={handlePageChange}
            forcePage={pageOffset - 1}
          />
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tambah Kategori</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Nama Kategori</FormLabel>
                <Input
                  isRequired
                  type='text'
                  placeholder='Masukkan nama kategori'
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Batal
              </Button>
              <Button
                colorScheme='green'
                onClick={() => handleCreateCategory(name)}
              >
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
}
