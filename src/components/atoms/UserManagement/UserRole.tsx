import { Badge } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Role } from "../../../data/constants";

export default function UserRole(props: PropsWithChildren) {
  const colorHandle = (child?: string) => {
    switch (child) {
      case Role.SUPER_ADMIN:
        return "superAdminColor";
      case Role.BRANCH_ADMIN:
        return "branchAdminColor";
      default:
        return "userColor";
    }
  };

  const toCamelCase = (data: string | undefined) => {
    console.log(data);
    return !data ? "" : data.replace(/[_]/g, " ");
  };
  return (
    <Badge
      fontSize={"14px"}
      shadow={"xs"}
      bg={colorHandle(props.children as string)}
      textTransform={"capitalize"}
      fontWeight={"bold"}
      borderRadius={"10px"}
      py={"4px"}
      px={"6px"}
    >
      {toCamelCase(props.children as string)}
    </Badge>
  );
}
