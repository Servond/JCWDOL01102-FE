import { Box, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import DetailProfile from "../../components/organism/MyDetails/DetailProfile";
import HeaderDetailProfile from "../../components/molecules/MyDetails/HeaderDetailProfile";
import ChangeProfileField from "../../components/organism/MyDetails/ChangeProfileField";

export default function MyDetailsPage() {
  const zoom = keyframes`
    from {transform: scale(0.95);}
    to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;
  return (
    <Box animation={animation}>
      <HeaderDetailProfile />
      <DetailProfile />
      <ChangeProfileField />
    </Box>
  );
}
