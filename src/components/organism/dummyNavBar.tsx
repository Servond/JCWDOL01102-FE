import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { Role, constants } from "../../data/constants";
import NavbarComponent from "../atoms/NavBar/NavbarComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";

export default function DummyNavBar() {
  const [isMobile] = useMediaQuery("(max-width: 425px)");
  const userRole = useSelector((state: RootState) => state.login.role);
  const currentPageIndex = useSelector(
    (state: RootState) => state.navbar.currentPageIndex
  );
  return (
    <Box
      h={"60px"}
      boxShadow={"0 -2px 6px -1px rgba(0, 0, 0, 0.1)"}
      borderTopStartRadius={"18px"}
      borderTopEndRadius={"18px"}
      maxW={isMobile ? "full" : "425px"}
      w={"full"}
      position={"fixed"}
      bottom={"0px"}
      px={"1rem"}
      bg={"white"}
    >
      <Flex
        h={"full"}
        w={"full"}
        align={"center"}
        justify={"space-between"}
        p={0}
      >
        {constants.navbarField.map((item, index) => {
          if (
            (userRole === Role.USER || !userRole) &&
            item.fieldName === "Dashboard"
          ) {
            return;
          }
          return (
            <NavbarComponent
              key={index}
              name={item.fieldName}
              icon={item.icon}
              path={item.path}
              index={index}
              currentIndex={currentPageIndex}
            />
          );
        })}
      </Flex>
    </Box>
  );
}
