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
      <Card>
        <CardBody p={"20px"}>
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
