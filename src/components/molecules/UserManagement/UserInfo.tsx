import { Avatar, HStack } from "@chakra-ui/react";
import UserBioNameEmail from "../../atoms/UserManagement/UserBioNameEmail";

interface IUserInfo {
  name: string;
  email: string;
}

export default function UserInfo(props: IUserInfo) {
  return (
    <HStack>
      <Avatar w={"44px"} h={"44px"} />
      <UserBioNameEmail name={props.name} email={props.email} />
    </HStack>
  );
}
