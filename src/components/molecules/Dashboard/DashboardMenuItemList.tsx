import { VStack } from "@chakra-ui/react";
import DashboardMenuItem from "../../atoms/Dashboard/DashboardMenuItem";
import { useState } from "react";
import { constants } from "../../../data/constants";

export default function DashboardMenuItemList() {
  const [indexNow, setIndex] = useState<number>(0);
  return (
    <VStack spacing={"1rem"} w={"full"}>
      {constants.dashboardField.map((meta, arrIndex) => {
        return (
          <DashboardMenuItem
            key={arrIndex}
            to={meta.to}
            icon={<meta.icon />}
            menuIndex={arrIndex}
            indexNow={indexNow}
            onClick={() => setIndex(arrIndex)}
          >
            {meta.fieldName}
          </DashboardMenuItem>
        );
      })}
    </VStack>
  );
}
