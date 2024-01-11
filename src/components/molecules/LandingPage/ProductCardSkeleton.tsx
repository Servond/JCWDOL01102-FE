import { Card, CardBody } from "@chakra-ui/card";
import { HStack, VStack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";

export default function ProductCardSkeleleton() {
  return (
    <Card bg={"white"} w={"full"} borderRadius={"10px"} shadow={"none"}>
      <CardBody w={"full"} p={"1rem"}>
        <VStack w={"full"} align={"start"}>
          <Skeleton w={"full"} h={"200px"}></Skeleton>

          <SkeletonText
            noOfLines={2}
            spacing={"4px"}
            skeletonHeight={2}
            w={"full"}
          />
          {/* <VStack w={"full"} spacing={"4px"} align={"start"}>
            <Text
              fontSize={"14px"}
              color={"secondaryColor"}
            >{`${props.product.weight} g`}</Text>
          </VStack> */}
          <HStack w={"full"} justify={"space-between"}>
            <SkeletonText
              noOfLines={1}
              spacing={"4px"}
              skeletonHeight={2}
              w={"50%"}
            />
            {/* <IconButton
              _hover={{ fontSize: "24px", transition: "0.2s ease" }}
              transition={"0.2s ease"}
              aria-label=""
              borderRadius={"full"}
              icon={<FaBagShopping />}
            /> */}
            <SkeletonCircle size={"10"} />
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}
