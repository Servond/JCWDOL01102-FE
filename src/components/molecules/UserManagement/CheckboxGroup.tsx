import { Checkbox, Heading, VStack } from "@chakra-ui/react";

export default function CheckboxGroup() {
  return (
    <VStack spacing={"8px"} w={"full"} align={"start"}>
      <Heading
        color={"secondaryColor"}
        fontSize={"1rem"}
        fontWeight={"semibold"}
      >
        Role
      </Heading>
      <VStack w={"full"} align={"start"} fontWeight={"semibold"}>
        <Checkbox>Super Admin</Checkbox>
        <Checkbox>Branch Admin</Checkbox>
      </VStack>
    </VStack>
  );
}
