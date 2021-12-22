import {
  Box,
  Button,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import Tables from "../components/Tables";
import { db } from "../config/firebase";

const Penduduk = () => {
  const [state, setState] = useState<any[]>([]);
  const toast = useToast();
  useEffect(() => {
    async function fetch() {
      db.collection("data-penduduk").onSnapshot((docs) => {
        const data: any[] = [];
        docs.forEach((it) => {
          data.push({
            ...it.data(),
          });
        });
        setState(data);
      });
    }
    fetch();
  }, []);

  const onDelete = async (nik: string) => {
    await db
      .doc(`data-penduduk/${nik}`)
      .delete()
      .then(() => {
        toast({
          description: "Sukses Hapus Data",
          status: "success",
        });
      })
      .catch((e) => {
        toast({
          description: "Gagal Hapus Data",
          status: "error",
        });
      });
  };

  if (!state) return <Text>Loading...</Text>;

  return (
    <Box>
      <HStack>
        <Button
          leftIcon={<FiPlus />}
          colorScheme={"green"}
          onClick={() => router.push("/tambah-penduduk")}
        >
          Tambah Penduduk
        </Button>
      </HStack>
      <Table variant="striped" size={"sm"} mt={5}>
        <Thead>
          <Tr>
            <Th>NIK</Th>
            <Th>Nama</Th>
            <Th>Umur Kepala Keluarga</Th>
            <Th>Jumlah Pendapatan</Th>
            <Th>Jumlah Tanggungan</Th>
            <Th>Bantuan KKS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.map((it, id) => (
            <Tr key={id}>
              <Td>{it.nik}</Td>
              <Td>{it.nama}</Td>
              <Td>{it.umur}</Td>
              <Td>{it.jumlah_pendapatan}</Td>
              <Td>{it.jumlah_tanggungan}</Td>
              <Td>{it.bantuan}</Td>
              <Td>
                <HStack>
                  <IconButton
                    aria-label="icon"
                    icon={<FiEdit2 />}
                    onClick={() => router.push(`/edit/${it.nik}`)}
                  />
                  <IconButton
                    aria-label="icon"
                    onClick={() => onDelete(it.nik)}
                    icon={<FiTrash2 />}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Penduduk;
