import { HStack, Spacer, Text } from "@chakra-ui/react";
import { PiArrowLeft } from "react-icons/pi";

interface Props {
  title: string;
  href?: string;
  subMenu?: string;
  callbackSubmenu?: () => void;
  callback?: () => void;
}

export default function TitleHeader(props: Props) {
  const handleBack = () => {
    if (props.callback) {
      props.callback();
    }
  };
  return (
    <HStack pt={"10px"} width={"100%"}>
      <PiArrowLeft size={"24px"} cursor={"pointer"} onClick={handleBack} />
      <Text fontWeight={"bold"}>{props.title}</Text>
      <Spacer />
      {props.subMenu ? (
        <Text
          color={"primaryColor"}
          onClick={props.callbackSubmenu}
          cursor={"pointer"}
        >
          {props.subMenu}
        </Text>
      ) : null}
    </HStack>
  );
}
