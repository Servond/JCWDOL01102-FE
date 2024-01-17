import { Box, Card, HStack, Heading, Text, VStack } from "@chakra-ui/react";

interface IReportStatProps {
  value: string;
  name: string;
  icon: React.ReactNode;
}

export default function ReportStat(props: IReportStatProps) {
  return (
    <Card
      minW={"200px"}
      minH={"130px"}
      p={"1rem"}
      h={"100px"}
      w={"23%"}
      borderRadius={"10px"}
      shadow={"md"}
    >
      <HStack h={"full"} justify={"center"} spacing={"1.3rem"}>
        <Box
          minW={"60px"}
          minH={"60px"}
          w={"70px"}
          h={"70px"}
          bg={"superAdminColor"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"10px"}
          fontSize={"28px"}
        >
          {props.icon}
        </Box>
        <VStack w={"50%"} align={"start"} spacing={"4px"}>
          <Heading size={"md"}>{props.value}</Heading>
          <Text>{props.name}</Text>
        </VStack>
      </HStack>
    </Card>
  );
}
