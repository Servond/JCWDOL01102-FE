import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdOutlineCall } from "react-icons/md";
import { IAppInputProps } from "../../data/interfaces";

export default function AppInputPhoneNumber(props: IAppInputProps) {
  const [isFocus, setFocus] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("");
  const beforeLength = useRef<number>(0);

  useEffect(() => {
    if (!number) return;
    if (beforeLength.current > number.length) {
      setNumber(number);
      beforeLength.current = number.length;
      return;
    }

    if (number.length % 4 === 0) {
      const newVal =
        number.slice(0, length - 1) + "-" + number.slice(length - 1);
      setNumber(newVal);
      beforeLength.current = number.length;
      return;
    }

    setNumber(number);
    beforeLength.current = number.length;
  }, [number]);

  const onChangeHandller = (e: ChangeEvent<HTMLInputElement>) => {
    const current: string = e.target.value;
    setNumber(current);
  };

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
        value={number}
        variant={"flushed"}
        focusBorderColor="primaryColor"
        fontSize={"18px"}
        // type="number"
        borderColor={"#E2E2E2"}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          onChangeHandller(e);
          props.onChange?.(e);
        }}
        name="number"
        // placeholder="Number"
      />
    </InputGroup>
  );
}
