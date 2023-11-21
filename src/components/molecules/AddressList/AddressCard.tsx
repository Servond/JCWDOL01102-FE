import {
  Card,
  CardBody,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import AddressLabel from "../../atoms/MyAddress/AddressLabel";
import ChangeAddressBtn from "../../atoms/MyAddress/ChangeAddressButton";
import AddressTag from "../../atoms/MyAddress/addressTag";
import AddressName from "../../atoms/MyAddress/AddressName";

interface Props {
  addressName: string;
  name: string;
  phoneNumber: string;
  address: string;
  isDefault: boolean;
}

export default function AddressCard(props: Props) {
  return (
    <GridItem>
      <Card
        border={props.isDefault ? "2px solid #53B175" : "1px solid #E2E8F0"}
        bgColor={props.isDefault ? "#e0f1e6" : "rgba(226, 232, 240, 0.1)"}
      >
        <CardBody px={"20px"}>
          <VStack spacing={"2px"} alignItems={"start"}>
            <HStack width={"100%"}>
              <AddressLabel addressName={props.addressName} />
              {props.isDefault ? <AddressTag /> : null}
            </HStack>
            <AddressName name={props.name} />
            <Text fontSize={"xs"}>{props.phoneNumber}</Text>
            <Text fontSize={"xs"}>{props.address}</Text>
            <ChangeAddressBtn />
          </VStack>
        </CardBody>
      </Card>
    </GridItem>
  );
}
