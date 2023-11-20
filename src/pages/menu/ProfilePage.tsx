import { Box, Spacer } from "@chakra-ui/react";
import ProfileHeader from "../../components/molecules/menu/ProfileHeader";
import ProfileMenu from "../../components/organism/menu/ProfileMenu";
import LogoutButton from "../../components/atoms/menu/LogoutButton";

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
