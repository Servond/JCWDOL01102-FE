import { CircularProgress } from "@chakra-ui/react";

interface ILoadingProps {
  size: string | number;
  color: string | undefined;
  trackColor: string | undefined;
}

export default function Loading(props: ILoadingProps) {
  return (
    <CircularProgress
      isIndeterminate
      color={props.color}
      trackColor={props.trackColor}
      size={props.size}
    ></CircularProgress>
  );
}

Loading.defaultProps = {
  size: "40px",
  color: "thirdColor",
  trackColor: "primaryColor",
};
