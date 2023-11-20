import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import React, { useEffect, useState } from "react";
import {
  MdAlternateEmail,
  MdOutlineCheck,
  MdOutlineClose,
} from "react-icons/md";
import { IAppInputProps } from "../../data/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import Loading from "./Loading";
import { Box } from "@chakra-ui/react";
import {
  fetchUserByEmail,
  setGetEmailState,
} from "../../app/redux/slice/userSlicer";
import { isEmailValid } from "../../utils/function/isEmailValid";

const generateEmailStatus = (
  status: string,
  response: boolean | undefined
): React.ReactElement | null => {
  if (status === "idle") {
    return null;
  } else if (status === "pending") {
    return <Loading size={"18px"} />;
  } else if (status === "done" && response) {
    return (
      <Box color={"primaryColor"} fontSize={"20px"}>
        <MdOutlineCheck />
      </Box>
    );
  } else if (status === "done" && !response) {
    return (
      <Box color={"red.500"} fontSize={"20px"}>
        <MdOutlineClose />
      </Box>
    );
  } else {
    return null;
  }
};

export default function AppInputEmail(props: IAppInputProps) {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const getEmailstate = useSelector(
    (store: RootState) => store.user.getEmailState
  );
  const apiResponse = useSelector(
    (store: RootState) => store.user.getEmailResp?.data?.available
  );
  useEffect(() => {
    if (!isEmailValid(email)) {
      dispatch(setGetEmailState());
      return;
    }
    const controller = new AbortController();
    dispatch(fetchUserByEmail({ email: email, controller: controller }));
    return () => controller.abort();
  }, [email, dispatch]);

  return (
    <InputGroup>
      <InputLeftElement
        fontSize={"22px"}
        display={"flex"}
        justifyContent={"start"}
        color={isFocus ? "primaryColor" : "forthColor"}
      >
        <MdAlternateEmail />
      </InputLeftElement>
      <Input
        variant={"flushed"}
        focusBorderColor="primaryColor"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          props.onChange?.(e);
          setEmail(e.target.value);
        }}
        fontSize={"18px"}
        borderColor={"#E2E2E2"}
        name="email"
        value={email}
      />
      <InputRightElement
        fontSize={"22px"}
        color={"successColor"}
        display={"flex"}
        justifyContent={"end"}
      >
        {generateEmailStatus(getEmailstate, apiResponse)}
      </InputRightElement>
    </InputGroup>
  );
}
