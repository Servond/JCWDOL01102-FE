import { Flex } from "@chakra-ui/react";
import InputGroup from "../../molecules/promotionMangement/InputGroup";

export default function VoucherTableHeader() {
  return (
    <Flex w={"full"} justify={"end"}>
      <InputGroup />
    </Flex>
  );
}
