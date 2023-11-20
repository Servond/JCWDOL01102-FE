import { Box } from "@chakra-ui/react";
import DetailProfile from "../../components/organism/MyDetails/DetailProfile";
import HeaderDetailProfile from "../../components/molecules/MyDetails/HeaderDetailProfile";

export default function MyDetailsPage() {
  return (
    <Box>
      <HeaderDetailProfile />
      <DetailProfile />
    </Box>
  );
}
