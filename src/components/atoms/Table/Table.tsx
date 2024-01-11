/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { AiOutlineInbox } from "react-icons/ai";
import LoadingCenter from "../../molecules/Loading";

interface ChakraTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  width?: string;
  maxWidth?: string; // Tambahkan properti maxWidth pada setiap kolom
  render?: (text: string | number, record: DataType) => React.ReactNode;
}

export interface DataType {
  key: string;
  [key: string]: string | number | string[] | number[] | undefined | object;
}

const ChakraTable: React.FC<ChakraTableProps> = ({
  columns,
  data,
  loading,
}) => (
  <Table
    variant='simple'
    width={"max-content"}
    minW={"full"}
    opacity={loading ? 0.5 : 1}
  >
    <Thead>
      <Tr
        minW={"fit-content"}
        style={{ position: "sticky", top: 0 }}
        backgroundColor={"white"}
        zIndex={1}
      >
        {columns.map((column) => (
          <Th
            key={column.key}
            width={column.width || "auto"}
            maxWidth={column.maxWidth || "none"}
          >
            {column.title}
          </Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {
        // Tampilkan loading jika loading bernilai true
        loading && (
          <Tr>
            <Td colSpan={columns.length} opacity={1}>
              <LoadingCenter />
            </Td>
          </Tr>
        )
      }
      {!loading &&
        data.map((record) => (
          <Tr key={record.key}>
            {columns.map((column) => (
              <Td
                key={column.key}
                width={column.width || "auto"}
                maxWidth={column.maxWidth || "none"}
              >
                {column.render
                  ? column.render(String(record[column.dataIndex]), record)
                  : record[column.dataIndex]}
              </Td>
            ))}
          </Tr>
        ))}
      {!loading && data.length === 0 && (
        <Tr>
          <Td colSpan={columns.length} opacity={1}>
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <AiOutlineInbox size={"60px"} color={"#ccccff"} />
              <Text> Data Tidak Ada</Text>
            </Flex>
          </Td>
        </Tr>
      )}
    </Tbody>
  </Table>
);

export default ChakraTable;
