import {
  Box,
  Spacer,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import ProfileHeader from "../../components/molecules/Menu/ProfileHeader";
import ProfileMenu from "../../components/organism/Menu/ProfileMenu";
import LogoutButton from "../../components/atoms/Menu/LogoutButton";

export default function MenuPage() {
  const zoom = keyframes`
  from {transform: scale(0.95);}
  to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;
  return (
    <Box height={"100vh"} animation={animation}>
      <ProfileHeader />
      <ProfileMenu />
      <Spacer />
      <LogoutButton />
    </Box>
  );
}
