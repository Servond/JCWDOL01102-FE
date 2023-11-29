import { IconButton } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import {
  setDrawer,
  setRender,
} from "../../../app/redux/slice/Animation/animationSlice";

export default function MenuButton() {
  const dispatch = useDispatch<AppDispatch>();
  const isDrawerOpen = useSelector(
    (store: RootState) => store.animation.drawer
  );
  return (
    <IconButton
      aria-label="icon-button"
      fontSize={"25px"}
      icon={<MdMenu />}
      bg={"transparent"}
      color={"white"}
      _hover={{ cursor: "pointer" }}
      onClick={() => {
        dispatch(setDrawer(!isDrawerOpen));
        dispatch(setRender(true));
      }}
    />
  );
}
