import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";

interface InfoCardProps {
  title: string;
  value: string | number;
  icon: ReactElement;
}
export default function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <Card width={"300px"}>
      <CardBody>
        <Box position={"relative"} paddingRight={"50px"}>
          <Heading fontSize={"large"} zIndex={3}>
            {title}
          </Heading>
          <Text fontSize={"medium"} zIndex={3}>
            {value}
          </Text>
          <Box
            position={"absolute"}
            bottom={"-10px"}
            right={"-10px"}
            zIndex={1}
          >
            {icon}
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}
