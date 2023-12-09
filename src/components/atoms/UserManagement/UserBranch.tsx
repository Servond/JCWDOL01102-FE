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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { AdminEditByIdInput } from "../../../data/user/interfaces";
import { updateAdmin } from "../../../app/redux/slice/Admin/userManagement/updateAdmin";

interface IUserBranchProps {
  id: number;
  branchId?: number | null;
  branchName?: string;
  role?: string;
}

export default function UserBranch(props: IUserBranchProps) {
  const [isBranchEdit, setIsBranchEdit] = useState<boolean>();
  const [value, setValue] = useState<OptionType | null | undefined>(null);
  const dispatch = useDispatch<AppDispatch>();
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

  useEffect(() => {
    setValue(
      !props.branchName
        ? undefined
        : ({
            value: String(props.branchId),
            label: props.branchName,
          } as OptionType)
    );
  }, []);

  const handleBlur = () => {
    setIsBranchEdit(false);
    if (value?.label === props.branchName) return;
    const data: AdminEditByIdInput = {
      id: props.id!,
      data: {
        branch_id: Number(value?.value),
      },
    };
    dispatch(updateAdmin(data));
  };

  return props.role === Role.BRANCH_ADMIN ? (
    <HStack
      onClick={() => setIsBranchEdit(true)}
      _hover={{ cursor: "pointer" }}
    >
      {isBranchEdit ? (
        <Select
          theme={SelectTheme}
          styles={SelectBranchStyle}
          onBlur={handleBlur}
          ref={selectRef}
          options={branches.map((branch) => {
            const option: OptionType = {
              label: branch.name,
              value: String(branch.id),
            };
            return option;
          })}
          value={value}
          onChange={(option) => {
            const opt = option as OptionType;
            setValue(opt);
          }}
          placeholder="Branch"
        />
      ) : (
        <Text fontWeight={"semibold"} size={"16px"}>
          {!value?.label ? "Not assigned" : value?.label}
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
