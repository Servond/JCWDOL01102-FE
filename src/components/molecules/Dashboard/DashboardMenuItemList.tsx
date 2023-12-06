import { VStack } from "@chakra-ui/react";
import DashboardMenuItem from "../../atoms/Dashboard/DashboardMenuItem";
import { useState } from "react";
import { constants } from "../../../data/constants";
import { RootState } from "../../../app/redux/store";
import { useSelector } from "react-redux";

export default function DashboardMenuItemList() {
  const userState = useSelector((state: RootState) => state.login);
  const [indexNow, setIndex] = useState<number>(0);
  return (
    <VStack spacing={"1rem"} w={"full"}>
      {constants.dashboardField.map((meta, arrIndex) => {
        return (
          meta.role.includes(userState.role) && (
            <DashboardMenuItem
              key={arrIndex}
              to={meta.path}
              icon={<meta.icon />}
              menuIndex={arrIndex}
              indexNow={indexNow}
              onClick={() => setIndex(arrIndex)}
            >
              {meta.fieldName}
            </DashboardMenuItem>
          )
        );
      })}
    </VStack>
  );
}
