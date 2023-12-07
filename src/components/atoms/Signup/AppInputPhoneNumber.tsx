import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { useEffect, useRef, useState } from "react";
import { MdOutlineCall } from "react-icons/md";
import { setNumberInput } from "../../../app/redux/slice/userSlicer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import { IAppInputProps } from "../../../data/interfaces";

export default function AppInputPhoneNumber(props: IAppInputProps) {
  const [isFocus, setFocus] = useState<boolean>(false);
  const beforeLength = useRef<number>(0);
  const dispatch = useDispatch();
  const numberInputValue = useSelector(
    (state: RootState) => state.user.numberInputValue
  );

  useEffect(() => {
    if (!numberInputValue) return;
    if (beforeLength.current > numberInputValue.length) {
      beforeLength.current = numberInputValue.length;
      return;
    }

    if (numberInputValue.length % 4 === 0) {
      const newVal =
        numberInputValue.slice(0, length - 1) +
        "-" +
        numberInputValue.slice(length - 1);
      dispatch(setNumberInput(newVal));
      beforeLength.current = numberInputValue.length;
      return;
    }

    // setNumberInput(newVal);
    beforeLength.current = numberInputValue.length;
  }, [numberInputValue, dispatch]);

  return (
    <InputGroup>
      <InputLeftElement
        fontSize={"22px"}
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        color={isFocus ? "primaryColor" : "forthColor"}
      >
        <MdOutlineCall />
      </InputLeftElement>
      <Input
        value={numberInputValue}
        variant={"flushed"}
        focusBorderColor="primaryColor"
        fontSize={"18px"}
        borderColor={"#E2E2E2"}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          setFocus(false);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          props.onChange?.(e);
          const newVal = e.target.value;
          dispatch(setNumberInput(newVal));
        }}
        name="number"
        id="number"
      />
    </InputGroup>
  );
}
