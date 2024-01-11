import { VStack } from "@chakra-ui/react";
import DiscountTab from "../../components/organism/VoucherMangement/DiscountTab";
import VoucherTableHeader from "../../components/organism/DiscountTableHeader";
import { useRef } from "react";

export default function VoucherManagementPage() {
  const stackRef = useRef<HTMLDivElement>(null);

  return (
    <VStack overflow={"auto"} h={"full"} ref={stackRef}>
      <VoucherTableHeader />
      <DiscountTab />
    </VStack>
  );
}
