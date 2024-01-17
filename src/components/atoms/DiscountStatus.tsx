import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IDiscountStatusProps {
  startDate: string;
  endDate: string;
}
export default function DiscountStatus(props: IDiscountStatusProps) {
  const [status, setStatus] = useState<string>("");
  useEffect(() => {
    const now = new Date();
    setStatus(
      now >= new Date(props.startDate) && now <= new Date(props.endDate)
        ? "Active"
        : "Inactive"
    );
  }, []);
  return (
    <Badge
      fontSize={"14px"}
      shadow={"xs"}
      bg={status === "Active" ? "green.200" : "red.200"}
      textTransform={"capitalize"}
      fontWeight={"bold"}
      borderRadius={"10px"}
      //   color={"white"}
      py={"4px"}
      px={"6px"}
    >
      {status}
    </Badge>
  );
}
