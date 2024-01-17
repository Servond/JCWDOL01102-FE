import {
  Box,
  Divider,
  Flex,
  Input,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getOrderManagement } from "../../../app/redux/slice/Admin/orderManagement/orderManagementSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import ChakraTable, { Column } from "../../../components/atoms/Table/Table";
import Paginate from "../../../components/molecules/Paginate";
import OrderAction from "../../../components/organism/Admin/OrderAction/OrderAction";
import OrderStatus from "../../../components/organism/Admin/OrderStatus/OrderStatus";
import {
  SelectStyle,
  SelectTheme,
} from "../../../themes/Select/ReactSelect.theme";
import { localeCurrency } from "../../../utils/function/localeCurrency";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import {
  orderByOptions,
  orderStatus,
} from "./constants/ordermanagementConstants";

interface IData {
  key: string;
  id: number;
  created_at: string;
  updated_at: string;
  invoiceNumber: string;
  amount: number;
  status: string;
}

export default function OrderManagementPage() {
  const [page, setPage] = useState<number>(1);
  const [isRefresh, setRefresh] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [invoiceNo] = useDebounce(search, 500);
  const [data, setData] = useState<IData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const orderManagementState = useSelector(
    (state: RootState) => state.orderManagement
  );

  useEffect(() => {
    dispatch(
      getOrderManagement({ page, pageSize: 10, status, sort, invoiceNo })
    );
  }, [page, isRefresh, status, sort, invoiceNo, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [status, sort, invoiceNo]);

  useEffect(() => {
    if (orderManagementState.apiState === "done") {
      const payload: IData[] = orderManagementState.orders.map((order) => {
        return {
          key: String(order.id),
          id: order.id,
          created_at: order.createdAt,
          updated_at: order.updatedAt,
          invoiceNumber: order.invoiceNo,
          amount: order.total,
          status: order.status,
        };
      });
      setData(payload);
    }
  }, [orderManagementState]);

  const columns: Column[] = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      render: (text) => {
        return (
          <Link
            to={`/dashboard/order-management/${text}`}
            style={{ fontWeight: "600" }}
          >
            <Tooltip
              label={"Lihat Detail"}
              aria-label={"Lihat Detail"}
              placement={"bottom-start"}
            >
              <Text>{text}</Text>
            </Tooltip>
          </Link>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        return <Text>{localeCurrency(text as number, "IDR")}</Text>;
      },
    },
    {
      title: "Tanggal Transaksi",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return (
          <Text>
            {DateTime.fromISO(text as string).toLocaleString(
              DateTime.DATETIME_MED
            )}
          </Text>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "fit-content",
      render: (text) => {
        return <OrderStatus status={text as string} />;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "250px",
      render(_, record) {
        return (
          <OrderAction
            refresh={() => {
              setRefresh(!isRefresh);
            }}
            id={record.id as number}
            status={record.status as string}
          />
        );
      },
    },
  ];

  return (
    <VStack height={"full"} width={"full"} overflow={"auto"} minW={"800px"}>
      <Flex justifyContent={"end"} w={"full"} p={4} gap={4} zIndex={2}>
        <Input
          width={"300px"}
          placeholder={"Invoice Number"}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Spacer />
        <Select
          styles={SelectStyle}
          theme={SelectTheme}
          options={orderStatus}
          onChange={(e) => {
            setStatus(e?.value as string);
          }}
          defaultValue={orderStatus[0]}
        />
        <Select
          styles={SelectStyle}
          theme={SelectTheme}
          options={orderByOptions}
          onChange={(e) => {
            setSort(e?.value as string);
          }}
          defaultValue={orderByOptions[0]}
        />
      </Flex>
      <Divider />
      <Box width={"full"} height={"full"} overflowX={"auto"} overflowY={"auto"}>
        <ChakraTable
          columns={columns}
          data={data}
          loading={orderManagementState.apiState === "pending"}
        />
      </Box>
      <Box display={orderManagementState.totalPages > 1 ? "flex" : "none"}>
        <Paginate
          onPageChange={(page) => {
            setPage(page.selected + 1);
            setRefresh(!isRefresh);
          }}
          pageCount={orderManagementState.totalPages}
          forcePage={page - 1}
          key={0}
        />
      </Box>
    </VStack>
  );
}
