import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { FaSort, FaFilter, FaPlus } from "react-icons/fa";
import FilterModal from "./filterModal";
import { useNavigate } from "react-router-dom";

export default function ButtonGroup() {
  const filterDisclosure = useDisclosure();
  const sortDisclosure = useDisclosure();
  const navigate = useNavigate();
  return (
    <HStack>
      <Button
        variant={"secondaryButton"}
        color={"secondaryColor"}
        borderColor={"secondaryColor"}
        py={"1rem"}
        fontSize={"16px"}
        onClick={sortDisclosure.onOpen}
      >
        <HStack>
          <Box fontSize={"16px"}>
            <FaSort />
          </Box>
          <Text>Sort</Text>
        </HStack>
      </Button>
      <Button
        variant={"secondaryButton"}
        py={"1rem"}
        fontSize={"16px"}
        color={"secondaryColor"}
        borderColor={"secondaryColor"}
        onClick={filterDisclosure.onOpen}
      >
        <HStack>
          <Box fontSize={"16x"}>
            <FaFilter />
          </Box>
          <Text>Filters</Text>
        </HStack>
      </Button>
      <Button
        variant={"primaryButton"}
        py={"1rem"}
        fontSize={"16px"}
        onClick={() => navigate("/dashboard/create-admin")}
      >
        <HStack>
          <Box fontSize={"16px"}>
            <FaPlus />
          </Box>
          <Text>Add Admin</Text>
        </HStack>
      </Button>
      <FilterModal
        isOpen={filterDisclosure.isOpen}
        onClose={filterDisclosure.onClose}
      />
    </HStack>
  );
}
