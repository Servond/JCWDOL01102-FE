import { GridItem, useToast } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { PiCopyBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  changeFieldProfile,
  changeLabelProfile,
  changeValueProfile,
  openChangeProfile,
} from "../../../../app/redux/slice/MyDetails/Profile/changeProfileSlice";

interface Props {
  label: string;
  copyIcon?: boolean;
  value: string;
  field: string;
}

export default function ButtonDetail(props: Props) {
  const toast = useToast();
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(changeLabelProfile(props.label));
    dispatch(changeValueProfile(props.value));
    dispatch(changeFieldProfile(props.field));
    dispatch(openChangeProfile());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(props.value);
    toast({
      title: "Copied!",
      description: "Your " + props.label + " has been copied to clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <GridItem
      colSpan={1}
      justifyContent={"center"}
      placeItems={"center"}
      cursor={"pointer"}
      alignItems={"center"}
    >
      {props.copyIcon ? (
        <PiCopyBold size={"20px"} onClick={handleCopy} />
      ) : (
        <FaChevronRight onClick={handleChange} />
      )}
    </GridItem>
  );
}
