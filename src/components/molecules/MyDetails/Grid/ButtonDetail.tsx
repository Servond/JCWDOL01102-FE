import { GridItem, useToast } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { PiCopyBold } from "react-icons/pi";

interface Props {
  label: string;
  copyIcon?: boolean;
  value: string;
}

export default function ButtonDetail(props: Props) {
  const toast = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(props.value);
    toast({
      title: "Copied!",
      description: "Your " + props.label + " has been copied to clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <GridItem
      colSpan={1}
      justifyContent={"center"}
      placeItems={"center"}
      cursor={"pointer"}
      alignItems={"center"}
    >
      {props.copyIcon ? (
        <PiCopyBold size={"20px"} onClick={handleCopy} />
      ) : (
        <FaChevronRight />
      )}
    </GridItem>
  );
}
