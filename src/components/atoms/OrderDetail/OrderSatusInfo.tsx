import { Box, StepDescription, StepTitle, Text } from "@chakra-ui/react";
import { toGMT7 } from "../../../utils/function/toGMT7";

interface IOrderStatusInfoProps {
  status: string;
  timestamp: string;
}

export default function OrderStatusInfo(props: IOrderStatusInfoProps) {
  return (
    <Box w={"full"} h={"80px"}>
      <StepTitle>
        <Text textTransform={"capitalize"}>
          {props.status.replace("_", " ")}
        </Text>
      </StepTitle>
      <StepDescription>{toGMT7(props.timestamp)}</StepDescription>
    </Box>
  );
}
