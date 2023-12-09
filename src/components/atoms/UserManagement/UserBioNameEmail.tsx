/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Role } from "../../../data/constants";

interface IUserBioNameEmailProps {
  name?: string;
  email?: string;
  role?: string;
}

export default function UserBioNameEmail(props: IUserBioNameEmailProps) {
  const [isEditName, setEditName] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setValue(props.name!);
    if (!isEditName) return;
    inputRef?.current?.focus();
  }, [isEditName]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
              onBlur={() => setEditName(false)}
              onChange={handleChange}
              px={"4px"}
            />
          ) : (
            <Text fontWeight={"semibold"} size={"16px"}>
              {props.name}
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
          {props.name}
        </Text>
      )}

      <Text fontWeight={"semibold"} fontSize={"14px"} color={"secondaryColor"}>
        {props.email}
      </Text>
    </VStack>
  );
}
