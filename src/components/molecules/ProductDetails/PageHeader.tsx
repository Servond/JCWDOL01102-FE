import { HStack, IconButton } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function PageHeader() {
  const navigate = useNavigate();
  return (
    <HStack
      w={"calc(500px - 2rem)"}
      justify={"space-between"}
      position={"fixed"}
      top={"16px"}
    >
      <IconButton
        fontSize={"18px"}
        onClick={() => navigate(-1)}
        _hover={{ cursor: "pointer" }}
        aria-label=""
        icon={<FaChevronLeft />}
        borderRadius={"full"}
        bg={"rgba(0,0,0,0.2)"}
      />
    </HStack>
  );
}
