import {
  AbsoluteCenter,
  Box,
  Checkbox,
  Container,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useCheckboxGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IApiResponse } from "../../../data/interfaces";
import { IGetProductVoucherResponse } from "../../../data/voucher/interface";
import LoadingCenter from "../Loading";
import { fetchProductVoucherByBranch } from "../../../api/admin/discount-management";
import ProductCheckBox from "../../atoms/voucherManagement/ProductCheckBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { setApplyButtonState } from "../../../app/redux/slice/Admin/discount/productApplyButton";
import { setCheckboxValue } from "../../../app/redux/slice/Admin/discount/manageProductVoucher";
import { validateArray } from "../../../utils/function/validateArray";
import SearchBar from "../../atoms/SearchBar";

interface IProductCheckboxTable {
  voucherId: number;
}

export default function ProductCheckboxTable(props: IProductCheckboxTable) {
  const [response, setResponse] =
    useState<IApiResponse<IGetProductVoucherResponse> | null>(null);
  const manageProductApiResp = useSelector(
    (state: RootState) => state.manageProductVoucher.resp
  );
  const [apiState, setApiState] = useState<"idle" | "pending" | "done">("idle");
  const { value, getCheckboxProps, setValue } = useCheckboxGroup({
    onChange: (value) => {
      if (parentCheckboxChecked) {
        setparentCheckboxChecked(false);
      } else {
        if (response?.data?.productList.length === value.length) {
          setparentCheckboxChecked(true);
        }
      }
      dispatch(setCheckboxValue(value));
    },
  });
  const [currentProducts, setCurrentProducts] = useState<string[] | null>();
  const [searchKey, setKey] = useState<string>("");
  const [isScrollTop, setScrollTop] = useState<boolean>(true);
  const [parentCheckboxChecked, setparentCheckboxChecked] =
    useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const getProductVoucher = async () => {
    try {
      setApiState("pending");
      const res = await fetchProductVoucherByBranch(props.voucherId, searchKey);
      setResponse(res);
      setApiState("idle");
    } catch (e) {
      setApiState("idle");
    }
  };

  useEffect(() => {
    getProductVoucher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manageProductApiResp, searchKey]);

  useEffect(() => {
    if (!response) return;
    const activeProd = response?.data?.activeProductIdList;
    if (
      response.data?.productList.length ===
      response.data?.filteredActiveProductIdList.length
    ) {
      setparentCheckboxChecked(true);
    }
    setValue(activeProd!);
    setCurrentProducts(activeProd!);
    dispatch(setCheckboxValue(activeProd));
  }, [response]);

  useEffect(() => {
    if (!value || !currentProducts) return;
    if (validateArray(value as string[], currentProducts)) {
      dispatch(setApplyButtonState(false));
    } else {
      dispatch(setApplyButtonState(true));
    }
  }, [value, currentProducts, dispatch]);

  const checkedAllHandler = (isChecked: boolean) => {
    if (isChecked) {
      setValue(
        response?.data?.productList.map((prod) => String(prod.id)) as string[]
      );
    } else {
      if (currentProducts?.length === response?.data?.productList.length) {
        setValue([]);
      } else {
        setValue(currentProducts!);
      }
    }
    setparentCheckboxChecked(!parentCheckboxChecked);
  };
  return (
    <VStack w={"full"} align={"start"}>
      <Box pl={"8px"} mb={"1rem"}>
        <SearchBar
          placeHolder="Search products"
          onChange={(e) => {
            setKey(e);
          }}
        />
      </Box>

      <TableContainer
        maxH={"300px"}
        h={"300px"}
        overflowY={"auto"}
        w={"full"}
        onScroll={(e) => {
          const scrollY = e.currentTarget.scrollTop;
          if (scrollY <= 0.1) {
            setScrollTop(true);
          } else {
            setScrollTop(false);
          }
        }}
      >
        {apiState === "pending" ? (
          <Container h={"400px"}>
            <AbsoluteCenter>
              <LoadingCenter />
            </AbsoluteCenter>
          </Container>
        ) : (
          <Table>
            <Thead
              bg={"thirdColor"}
              shadow={!isScrollTop ? "xs" : "none"}
              transition={"0.1s ease"}
              position={"sticky"}
              top={0}
              zIndex={"1"}
            >
              <Tr>
                <Th>Poduct Name</Th>
                <Th>
                  <HStack>
                    <Text>Check All</Text>
                    <Checkbox
                      onChange={(e) => {
                        checkedAllHandler(e.target.checked);
                      }}
                      isChecked={parentCheckboxChecked}
                    />
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {response?.data?.productList.map((prod, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Text fontWeight={"semibold"}>{prod.name}</Text>
                    </Td>
                    <Td>
                      <ProductCheckBox
                        productId={prod.id}
                        getCheckboxProps={getCheckboxProps}
                        isChecked={prod.active}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </VStack>
  );
}
