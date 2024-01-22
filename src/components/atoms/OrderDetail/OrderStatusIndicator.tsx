import { StepIndicator, StepStatus } from "@chakra-ui/react";

import { MdDone } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { MdModeStandby } from "react-icons/md";

interface IOrderStatusIndicatorProps {
  index: number;
  currentIndex: number;
  status: string;
}

export default function OrderStatusIndicator(
  props: IOrderStatusIndicatorProps
) {
  const generateIndocatorBgColor = () => {
    if (props.status.includes("failed") || props.status.includes("canceled")) {
      return "#FF4545";
    } else if (props.currentIndex > props.index) {
      return "#53B175";
    } else {
      return "white";
    }
  };

  const generateIndocatorBorderColor = () => {
    if (props.status.includes("failed") || props.status.includes("canceled")) {
      return "#FF4545";
    } else if (props.currentIndex >= props.index) {
      return "#53B175";
    } else {
      return "#B1B1B1";
    }
  };

  const generateColor = () => {
    if (
      props.currentIndex > props.index ||
      props.status.includes("failed") ||
      props.status.includes("canceled")
    ) {
      return "white";
    } else if (props.currentIndex === props.index) {
      return "#53B175";
    } else {
      return "#B1B1B1";
    }
  };
  return (
    <StepIndicator
      style={{
        backgroundColor: generateIndocatorBgColor(),
        borderColor: generateIndocatorBorderColor(),
        color: generateColor(),
      }}
    >
      <StepStatus
        complete={
          props.status.includes("failed") ||
          props.status.includes("canceled") ? (
            <MdOutlineClose />
          ) : (
            <MdDone />
          )
        }
        incomplete={<MdOutlineClose />}
        active={<MdModeStandby />}
      />
    </StepIndicator>
  );
}
