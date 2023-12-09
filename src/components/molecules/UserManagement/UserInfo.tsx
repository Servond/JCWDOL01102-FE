import { Avatar, HStack } from "@chakra-ui/react";
import UserBioNameEmail from "../../atoms/UserManagement/UserBioNameEmail";

interface IUserInfo {
  name: string;
  email: string;
  role: string;
  id: number;
}

export default function UserInfo(props: IUserInfo) {
  return (
    <HStack>
      <Avatar w={"44px"} h={"44px"} name={props.name} zIndex={"0"} />
      <UserBioNameEmail
        name={props.name}
        email={props.email}
        role={props.role}
        id={props.id}
      />
    </HStack>
  );
}
