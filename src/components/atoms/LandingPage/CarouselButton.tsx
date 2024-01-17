import { Box, IconButton } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";

interface ICarouselButtonProps {
  variant: "previous" | "next";
  onClick: () => void;
  gridHeight: number | undefined;
  isFocused: boolean;
}

export default function CarouselButton(props: ICarouselButtonProps) {
  return (
    <Box
      position={"absolute"}
      zIndex={"2"}
      right={props.variant === "next" ? "-15px" : "none"}
      left={props.variant === "next" ? "none" : "-15px"}
      bottom={`calc(${props.gridHeight}px/2)`}
    >
      <motion.div
        initial={{ opacity: 0, x: props.variant === "next" ? "100%" : "-100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: props.variant === "next" ? "100%" : "-100%" }}
        transition={{ duration: "0.2" }}
      >
        <IconButton
          aria-label="next-button"
          icon={
            props.variant === "next" ? <FaChevronRight /> : <FaChevronLeft />
          }
          bg={"white"}
          shadow={"xl"}
          color={"black"}
          borderRadius={"full"}
          h={"40px"}
          w={"40px"}
          onClick={props.onClick}
        />
      </motion.div>
    </Box>
  );
}
