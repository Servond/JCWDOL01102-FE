import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import { useState } from "react";
import { FormikErrors } from "formik";

interface IDropdownProps {
  onChange: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          name: string;
          email: string;
          password: string;
          number: string;
          branch: number;
        }>
      >;
  value: number;
}

export default function Dropdown(props: IDropdownProps) {
  const branches = useSelector(
    (state: RootState) => state.createAdmin.branches
  );
  const [branchName, setBranchName] = useState<string>("");

  return (
    <Menu autoSelect={false} matchWidth variant={"dropdown"}>
      <MenuButton type="button">
        <Flex w={"full"} justify={"space-between"} align={"center"}>
          <Text>{!props.value ? "Select Branch" : props.value}</Text>
          <FaChevronDown />
        </Flex>
      </MenuButton>
      <MenuList>
        {branches.map((branch, index) => {
          return (
            <MenuItem
              value={branch.id}
              key={index}
              onClick={(e) => {
                props.onChange("branch", Number(e.currentTarget.value));
                setBranchName(branch.name);
              }}
            >
              {branch.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
