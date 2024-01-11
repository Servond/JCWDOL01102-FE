import { IconButton, useMediaQuery } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

interface ICarouselButtonProps {
  variant: "previous" | "next";
  onClick: () => void;
  
}

export default function CarouselButton(props: ICarouselButtonProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <IconButton
      aria-label="next-button"
      icon={props.variant === "next" ? <FaChevronRight /> : <FaChevronLeft />}
      bg={"white"}
      shadow={"xl"}
      color={"black"}
      borderRadius={"full"}
      h={"40px"}
      w={"40px"}
      onClick={props.onClick}
      position={"absolute"}
      zIndex={"2"}
      right={props.variant === "next" ? "-10px" : `calc(${isMobile ? window.screen.width : "500"}px - 61px)`}
      bottom={"50px"}
    />
  );
}
