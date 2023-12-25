import {
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import ProductCheckboxTable from "../../molecules/VoucherManagement/ProductCheckboxTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { manageProductVoucherData } from "../../../app/redux/slice/Admin/discount/manageProductVoucher";

interface IProductCheckboxesModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucherId: number;
}
export default function ProductCheckboxesModal(
  props: IProductCheckboxesModalProps
) {
  const dispatch = useDispatch<AppDispatch>();
  const isEnable = useSelector(
    (state: RootState) => state.applyButton.isEnable
  );
  const apiState = useSelector(
    (state: RootState) => state.manageProductVoucher.apiState
  );
  const checkboxValue = useSelector(
    (state: RootState) => state.manageProductVoucher.checkboxValue
  );
  const handleClick = () => {
    dispatch(
      manageProductVoucherData({
        voucherId: props.voucherId,
        data: checkboxValue,
      })
    )
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>
          <ModalCloseButton />
          <Heading size={"md"}>Product Assingment</Heading>
        </ModalHeader>
        <ModalBody p={"1rem"} maxH={"500px"}>
          <ProductCheckboxTable voucherId={props.voucherId} />
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              py={"0.5rem"}
              isDisabled={!isEnable}
              disabled={!isEnable}
              isLoading={apiState === "pending"}
              onClick={handleClick}
            >
              Apply
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
