import { Divider } from "@chakra-ui/react";
import {
  PiCreditCard,
  PiIdentificationCardLight,
  PiInfo,
  PiMapPin,
  PiNotification,
  PiQuestion,
  PiShoppingBagOpenDuotone,
  PiTicket,
} from "react-icons/pi";
import ProfileSubMenu from "../../molecules/Menu/ProfileSubMenu";

export default function ProfileMenu() {
  return (
    <>
      <ProfileSubMenu icon={<PiShoppingBagOpenDuotone />} menu={"My Orders"} />
      <ProfileSubMenu
        icon={<PiIdentificationCardLight />}
        menu={"My Details"}
        href='/my-details'
      />
      <ProfileSubMenu icon={<PiMapPin />} menu={"My Addresses"} />
      <ProfileSubMenu icon={<PiCreditCard />} menu={"Payment Methods"} />
      <ProfileSubMenu icon={<PiTicket />} menu={"Promo Cards"} />
      <ProfileSubMenu icon={<PiNotification />} menu={"Notifications"} />
      <ProfileSubMenu icon={<PiQuestion />} menu={"Help"} />
      <ProfileSubMenu icon={<PiInfo />} menu={"About"} />
      <Divider />
    </>
  );
}
