import { HStack, Spacer, Text } from "@chakra-ui/react";
import { PiArrowLeft } from "react-icons/pi";

interface Props {
  title: string;
  href?: string;
  callback?: () => void;
}

export default function TitleHeaderProfile(props: Props) {
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
    </HStack>
  );
}
