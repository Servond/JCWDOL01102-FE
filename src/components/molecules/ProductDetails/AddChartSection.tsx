import { Button, HStack, VStack, useMediaQuery } from "@chakra-ui/react";
import QuantityButton from "../../atoms/PruductDetails/QuantityButton";

interface IAddChartSectionProps {
  flexGrow: string;
}

export default function AddChartSection(props: IAddChartSectionProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <VStack
      w={"full"}
      flexGrow={props.flexGrow}
      justify={"end"}
      position={"sticky"}
      bottom={"0px"}
    >
      <HStack
        w={isMobile ? `${window.screen.width}px` : "500px"}
        p={"1rem"}
        bg={"white"}
        justify={"space-between"}
        boxShadow={"0 -2px 6px -1px rgba(0, 0, 0, 0.1)"}
      >
        <QuantityButton />
        <Button>Add to Cart</Button>
      </HStack>
    </VStack>
  );
}
