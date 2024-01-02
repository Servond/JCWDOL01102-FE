import { Button, Heading } from "@chakra-ui/react";

export default function MoreButton() {
  return (
    <Button variant={"tertiaryButton"} p={0} mb={"12px"}>
      <Heading fontSize={"14px"}>More</Heading>
    </Button>
  );
}
