import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRef } from "react";
import { resetUserLoginState } from "../../../app/redux/slice/User/login";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import logoutSvg from "../../../assets/logout.svg";
import { resetVoucherPagination } from "../../../app/redux/slice/Admin/discount/getVoucher";
import { resetPromotionPagination } from "../../../app/redux/slice/Admin/discount/getPromo";
import { resetUserPagination } from "../../../app/redux/slice/Admin/userManagement/adminManagement";
import { Role } from "../../../data/constants";
import { resetCartState } from "../../../app/redux/slice/cart/getProductCart";

interface ILogoutAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutAlert(props: ILogoutAlertProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useSelector((state: RootState) => state.login.role);
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const calculateWidth = (isMobile: boolean) => {
    if (location.pathname.includes("/dashboard")) {
      return "80%";
    } else if (!isMobile) {
      return "calc(500px - 10%)";
    } else {
      return `calc(${window.screen.width}px - 10%)`;
    }
  };
  const onLogout = () => {
    localStorage.clear();
    if (userRole === Role.USER) {
      dispatch(resetCartState());
    }
    dispatch(resetUserLoginState());
    if (location.pathname.includes("user-management")) {
      dispatch(resetUserPagination());
    } else if (location.pathname.includes("discount")) {
      dispatch(resetVoucherPagination());
      dispatch(resetPromotionPagination());
    }
    navigate("/", { replace: true });
    props.onClose();
  };
  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent p={"1rem"} w={calculateWidth(isMobile)}>
          <AlertDialogBody>
            <VStack spacing={"2rem"}>
              <Container
                w={location.pathname.includes("/dashboard") ? "300px" : "full"}
              >
                <Image src={logoutSvg} />
              </Container>
              <Heading textAlign={"center"} size={"md"}>
                Are you sure you want to log out?
              </Heading>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter mt={"1rem"}>
            <HStack w={"full"} justify={"center"}>
              <Button
                minW={"100px"}
                w={"full"}
                variant={"primaryButton"}
                py={"1rem"}
                ref={cancelRef}
                onClick={props.onClose}
              >
                No
              </Button>
              <Button
                w={"full"}
                minW={"100px"}
                bg={"errorColor"}
                py={"1rem"}
                onClick={onLogout}
              >
                Yes
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
