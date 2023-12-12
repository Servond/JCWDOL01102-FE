/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import React, { useEffect, useState } from "react";
import { getCategoryPage } from "../../../app/redux/slice/Admin/category/AdminCategorySlice";
import { createCategory } from "../../../api/admin/category";
import Category from "../../../components/organism/Admin/category/Category";
import ReactPaginate from "react-paginate";
import { useDebounce } from "use-debounce";

export default function CategoryPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categoryState = useSelector((state: RootState) => state.adminCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [refresh, setRefresh] = React.useState(false);
  const [name, setName] = React.useState("");
  const [pageOffset, setPageOffset] = React.useState(1);

  const handlePageChange = (selectedItem: any) => {
    setPageOffset(selectedItem.selected + 1);
  };

  const toast = useToast();
  const handleCreateCategory = async (name: string) => {
    try {
      if (name === "") {
        toast({
          title: "Gagal Menambahkan Kategori",
          description: "Nama Kategori tidak boleh kosong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return;
      }
      const response = await createCategory(name);
      toast({
        title: "Berhasil Menambahkan Kategori",
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
        title: "Gagal Menambahkan Kategori",
        description: error?.response?.data?.message ?? "Terjadi Kesalahan",
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
  return (
    <Box
      maxW={"100vw"}
      maxH={"100vh"}
      overflowY={"scroll"}
      overflowX={"hidden"}
    >
      <VStack padding={"15px"} height={"fit-content"}>
        <HStack w={"100%"} my={"15px"}>
          <Text fontSize='2xl' fontWeight='bold'>
            Daftar Kategori
          </Text>
          <Spacer />
          <Button onClick={onOpen} variant={"outline"}>
            Tambah Kategori
          </Button>
        </HStack>
        <HStack w={"100%"} my={"5px"}>
          <Input
            placeholder='Cari Kategori'
            width={"450px"}
            margin={"0"}
            onChange={(e) => setSearchCategory(e.target.value)}
            value={searchCategory}
          />
        </HStack>
        <Grid
          templateColumns={"repeat(3, 1fr)"}
          width={"100%"}
          justifyContent={"center"}
          rowGap={"10px"}
        >
          <GridItem colSpan={1}>
            <Text fontWeight={"bold"}>Nama Kategori</Text>
          </GridItem>
          <GridItem colSpan={1} margin={"0 auto"}>
            <Text fontWeight={"bold"}>Jumlah Produk</Text>
          </GridItem>
          <GridItem colSpan={1} margin={"0 auto"}>
            <Text fontWeight={"bold"}>Aksi</Text>
          </GridItem>
          {categoryState.pageData?.data.length !== 0 &&
            categoryState.pageData?.data.map((item) => (
              <Category
                id={item.id}
                key={item.id}
                name={item.name}
                totalItem={item.totalProduct!}
                setRefresh={() => setRefresh(!refresh)}
              />
            ))}
          <GridItem
            colSpan={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {categoryState.pageData?.data.length !== 0 && (
              <ReactPaginate
                previousLabel='Previous'
                nextLabel='Next'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                pageCount={categoryState.pageData?.totalPages ?? 1}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName='pagination'
                activeClassName='active'
                // forcePage={pageOffset}
              />
            )}
          </GridItem>
        </Grid>
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
