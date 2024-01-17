import { Box, GridItem, Text } from "@chakra-ui/react";

interface Props {
  value: string;
}
export default function ValueDetail(props: Props) {
  return (
    <GridItem colSpan={7} justifyContent={"center"} placeItems={"center"}>
      <Box
        height={"100%"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        py={"auto"}
      >
        <Text textAlign={"left"}>{props.value}</Text>
      </Box>
    </GridItem>
  );
}
