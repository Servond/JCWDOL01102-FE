import { Heading, Text, VStack } from "@chakra-ui/react";

interface IUserBioNameEmailProps {
  name?: string;
  email?: string;
}

export default function UserBioNameEmail(props: IUserBioNameEmailProps) {
  return (
    <VStack align={"start"} spacing={"1px"}>
      <Heading fontSize={"16px"}>{props.name}</Heading>
      <Text fontWeight={"semibold"} fontSize={"14px"} color={"secondaryColor"}>{props.email}</Text>
    </VStack>
  );
}
