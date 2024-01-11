import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/redux/store";

export default function ProfileHeader() {
  const navigate = useNavigate();
  const loginState = useSelector((state: RootState) => state.login);
  const handleEdit = () => {
    navigate("/my-details");
  };
  return (
    <Box height={"69px"} my={"35px"}>
      <HStack>
        <Box
          marginLeft={"25px"}
          height={"69px"}
          width={"69px"}
          border={"2px solid #53B175"}
          borderRadius={"50%"}
        >
          <img
            src='default.jpg'
            alt='profile'
            style={{
              borderRadius: "50%",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <VStack alignItems={"flex-start"} pl={"10px"}>
          <HStack>
            <Text
              fontSize={"20px"}
              fontWeight={"bold"}
              lineHeight={0}
              textAlign={"left"}
              my={1}
            >
              {loginState.user?.name}
            </Text>
            <FaRegEdit
              color={"#53B175"}
              style={{ cursor: "pointer" }}
              onClick={handleEdit}
            />
          </HStack>
          <Text fontSize={"14px"} lineHeight={0} my={1}>
            {loginState.user?.email}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
