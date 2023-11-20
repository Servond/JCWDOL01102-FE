import { Box, Spacer } from "@chakra-ui/react";
import ProfileHeader from "../../components/molecules/Menu/ProfileHeader";
import ProfileMenu from "../../components/organism/Menu/ProfileMenu";
import LogoutButton from "../../components/atoms/Menu/LogoutButton";

export default function MenuPage() {
  return (
    <Box height={"100vh"}>
      <ProfileHeader />
      <ProfileMenu />
      <Spacer />
      <LogoutButton />
    </Box>
  );
}
