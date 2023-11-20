import { Box, Spacer } from "@chakra-ui/react";
import ProfileHeader from "../../components/molecules/profile/ProfileHeader";
import ProfileMenu from "../../components/organism/profile/ProfileMenu";
import LogoutButton from "../../components/atoms/profile/LogoutButton";

export default function ProfilePage() {
  return (
    <Box height={"100vh"}>
      <ProfileHeader />
      <ProfileMenu />
      <Spacer />
      <LogoutButton />
    </Box>
  );
}
