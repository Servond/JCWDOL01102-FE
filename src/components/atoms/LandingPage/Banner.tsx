import { Box, Image, Skeleton } from "@chakra-ui/react";
import bannerSvg from "../../../assets/banner.svg";
import { useState } from "react";

export default function Banner() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const onload = () => setIsLoaded(true);
  const onError = () => setIsLoaded(false);
  return (
    <Skeleton w={"full"} borderRadius={"10px"} isLoaded={isLoaded} h={"130px"}>
      <Box w={"full"} borderRadius={"10px"} h={"full"}>
        <Image
          w={"full"}
          h={"full"}
          src={bannerSvg}
          onLoad={onload}
          onError={onError}
        />
      </Box>
    </Skeleton>
  );
}
