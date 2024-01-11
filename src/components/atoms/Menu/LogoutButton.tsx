import { Box, Button } from "@chakra-ui/react";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../app/redux/store";
import { resetUserLoginState } from "../../../app/redux/slice/User/login";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/");
    dispatch(resetUserLoginState());
  };

  return (
    <Box display={"grid"} placeItems={"center"} width={"100%"} mt={"35px"}>
      <Button
        leftIcon={<PiSignOut />}
        width={"90%"}
        mx={"auto"}
        onClick={onLogout}
      >
        Log Out
      </Button>
    </Box>
  );
}
