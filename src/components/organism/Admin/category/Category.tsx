/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Divider,
  GridItem,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { updateCategory } from "../../../../api/admin/category";

interface Props {
  id: number;
  name: string;
  totalItem: number;
  setRefresh: () => void;
}

export default function Category(props: Props) {
  const [name, setName] = React.useState(props.name);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [updateButton, setUpdateButton] = React.useState("Ubah");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const handleUpdate = async () => {
    if (isUpdate) {
      setIsLoading(true);
      try {
        const response = await updateCategory(props.id, name);
        toast({
          title: "Berhasil Mengubah Kategori",
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        props.setRefresh();
        setIsLoading(false);
        setUpdateButton("Ubah");
      } catch (error: any) {
        toast({
          title: "Gagal Mengubah Kategori",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setUpdateButton("Ubah");
        setIsLoading(false);
        props.setRefresh();
      }
    } else {
      setUpdateButton("Simpan");
    }
    setIsUpdate(!isUpdate);
  };

  return (
    <>
      <GridItem colSpan={3}>
        <Divider />
      </GridItem>
      <GridItem colSpan={1}>
        <Text display={isUpdate ? "none" : "block"}>{name}</Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          display={isUpdate ? "block" : "none"}
        />
      </GridItem>
      <GridItem colSpan={1} margin={"0 auto"}>
        <Text>{props.totalItem}</Text>
      </GridItem>
      <GridItem colSpan={1} margin={"0 auto"}>
        <HStack>
          <Button
            colorScheme={"red"}
            variant={"outline"}
            height={"30px"}
            isDisabled={isUpdate}
          >
            Hapus
          </Button>
          <Button
            colorScheme={"green"}
            variant={"outline"}
            height={"30px"}
            onClick={handleUpdate}
            isLoading={isLoading}
          >
            {updateButton}
          </Button>
        </HStack>
      </GridItem>
    </>
  );
}
