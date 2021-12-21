import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

export default function Tables() {
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>NIK</Th>
          <Th>Nama</Th>
          <Th>Umur Kepala Keluarga</Th>
          <Th>Jumlah Pendapatan</Th>
          <Th>Jumlah Tanggungan</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td>25.4</Td>
          <Td>25.4</Td>
          <Td>25.4</Td>
        </Tr>
      </Tbody>
    </Table>
  );
}
