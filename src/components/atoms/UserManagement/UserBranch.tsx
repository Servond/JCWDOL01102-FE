import { Box, HStack, Text } from "@chakra-ui/layout";
import { useEffect, useRef, useState } from "react";
import { Role } from "../../../data/constants";
import { MdEdit } from "react-icons/md";
import Select, { GroupBase, SelectInstance } from "react-select";
import { OptionType } from "../../../data/interfaces";
import {
  SelectBranchStyle,
  SelectTheme,
} from "../../../themes/Select/ReactSelect.theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

interface IUserBranchProps {
  branchId?: number | null;
  branchName?: string;
  role?: string;
}

export default function UserBranch(props: IUserBranchProps) {
  const [isBranchEdit, setIsBranchEdit] = useState<boolean>();
  const branches = useSelector(
    (state: RootState) => state.createAdmin.branches
  );
  const selectRef = useRef<SelectInstance<
    OptionType,
    false,
    GroupBase<OptionType>
  > | null>(null);

  useEffect(() => {
    if (!isBranchEdit) return;
    selectRef.current?.focus();
  }, [isBranchEdit]);

  return props.role === Role.BRANCH_ADMIN ? (
    <HStack
      onClick={() => setIsBranchEdit(true)}
      _hover={{ cursor: "pointer" }}
    >
      {isBranchEdit ? (
        <Select
          theme={SelectTheme}
          styles={SelectBranchStyle}
          onBlur={() => setIsBranchEdit(false)}
          ref={selectRef}
          options={branches.map((branch) => {
            const option: OptionType = {
              label: branch.name,
              value: String(branch.id),
            };
            return option;
          })}
          value={
            !props.branchName
              ? undefined
              : ({
                  value: String(props.branchId),
                  label: props.branchName,
                } as OptionType)
          }
          placeholder="Branch"
        />
      ) : (
        <Text fontWeight={"semibold"} size={"16px"}>
          {!props.branchId ? "Not assigned" : props.branchName}
        </Text>
      )}

      {isBranchEdit ? null : (
        <Box color={"secondaryColor"}>
          <MdEdit />
        </Box>
      )}
    </HStack>
  ) : (
    <Text fontSize={"16px"} fontWeight={"semibold"}>
      Not assigned
    </Text>
  );
}
