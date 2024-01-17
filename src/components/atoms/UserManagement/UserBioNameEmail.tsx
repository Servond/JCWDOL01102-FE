/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Role } from "../../../data/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { AdminEditByIdInput } from "../../../data/user/interfaces";
import { updateAdmin } from "../../../app/redux/slice/Admin/userManagement/updateAdmin";

interface IUserBioNameEmailProps {
  name?: string;
  email?: string;
  role?: string;
  id?: number;
}

export default function UserBioNameEmail(props: IUserBioNameEmailProps) {
  const [isEditName, setEditName] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const apiResp = useSelector((state: RootState) => state.updateAdmin.resp);
  useEffect(() => {
    if (!isEditName) return;
    inputRef?.current?.focus();
  }, [isEditName]);

  useEffect(() => {
    setValue(props.name!);
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (apiResp.statusCode === 200) return;
    setValue(props.name!);
  }, [apiResp]);

  const handleBlur = () => {
    setEditName(false);
    if (value === props.name) return;
    if (!value) {
      setValue(props.name!);
      return;
    }
    const data: AdminEditByIdInput = {
      id: props.id!,
      data: {
        name: value,
      },
    };
    dispatch(updateAdmin(data));
  };
  return (
    <VStack align={"start"} spacing={"1px"}>
      {props.role === Role.BRANCH_ADMIN ? (
        <HStack
          onClick={() => setEditName(true)}
          _hover={{ cursor: "pointer" }}
        >
          {isEditName ? (
            <Input
              ref={inputRef}
              variant={"editName"}
              value={value}
              onBlur={handleBlur}
              onChange={handleChange}
              px={"4px"}
            />
          ) : (
            <Text fontWeight={"semibold"} size={"16px"}>
              {value}
            </Text>
          )}

          {isEditName ? null : (
            <Box color={"secondaryColor"}>
              <MdEdit />
            </Box>
          )}
        </HStack>
      ) : (
        <Text fontWeight={"semibold"} size={"16px"}>
          {value}
        </Text>
      )}

      <Text fontWeight={"semibold"} fontSize={"14px"} color={"secondaryColor"}>
        {props.email}
      </Text>
    </VStack>
  );
}
