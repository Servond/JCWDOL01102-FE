import { Button, Heading } from "@chakra-ui/react";

interface IMoreButton {
  onClick: () => void;
}

export default function MoreButton(props: IMoreButton) {
  return (
    <Button
      variant={"tertiaryButton"}
      p={0}
      mb={"12px"}
      onClick={props.onClick}
    >
      <Heading fontSize={"14px"}>More</Heading>
    </Button>
  );
}
