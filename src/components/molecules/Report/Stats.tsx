import { HStack } from "@chakra-ui/react";
import ReportStat from "../../atoms/Report/ReportStat";
import { FaBoxes } from "react-icons/fa";

export default function Stats() {
  return (
    <HStack
      w={"full"}
      justify={"space-between"}
      flexWrap={"wrap"}
      align={"start"}
    >
      {[...Array(4)].map((_, index) => {
        return (
          <ReportStat
            key={index}
            name="Stat Name"
            value="100"
            icon={<FaBoxes />}
          />
        );
      })}
    </HStack>
  );
}
