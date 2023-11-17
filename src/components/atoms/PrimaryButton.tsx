import { Button } from "@chakra-ui/button";
import { ResponsiveValue } from "@chakra-ui/styled-system";
import { Property } from "csstype";
import { PropsWithChildren } from "react";

interface IPrimaryButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  bg: ResponsiveValue<Property.Color>;
}

export default function PrimaryButton(
  props: PropsWithChildren<IPrimaryButtonProps>
) {
  return (
    <Button
      onClick={props.onClick}
      bg={props.bg}
      color={"thirdColor"}
      fontWeight={"semibold"}
      borderRadius={"20px"}
      fontSize={"18px"}
      w={"full"}
      py={"1.8rem"}
    >
      {props.children}
    </Button>
  );
}

PrimaryButton.defaultProps = {
  onclick: undefined,
  bg: "primaryColor",
};
