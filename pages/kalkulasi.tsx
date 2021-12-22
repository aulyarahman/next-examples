import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { db } from "../config/firebase";

const Penduduk = () => {
  const [state, setState] = useState<any[]>([]);
  const [show, setShow] = useState(false);

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
    setShow(true);
  }, []);

  return (
    <Box>
      <Button
        colorScheme={"green"}
        leftIcon={<FiGrid />}
        onClick={() => router.push("/perhitungan")}
      >
        Analisis
      </Button>
      <Table variant="striped" size={"sm"} mt={5}>
        <Thead>
          <Tr>
            <Th>Nama</Th>
            <Th colspan="3">Umur Kepala Keluarga</Th>
            <Th colspan="3">Pendapatan</Th>
            <Th colspan="2">Jumlah Anggota Keluarga</Th>
            <Th>Hasil</Th>
          </Tr>
          <Tr>
            <Th></Th>
            <Th scope="col">Muda</Th>
            <Th scope="col">Tua</Th>
            <Th scope="col">Lansia</Th>
            <Th scope="col">Rendah</Th>
            <Th scope="col">Sedang</Th>
            <Th scope="col">Tinggi</Th>
            <Th scope="col">Sedikit</Th>
            <Th scope="col">Banyak</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.map((it, id) => (
            <Tr key={id}>
              <Td>{it.nama}</Td>
              <Td>{it.umur_kepala_keluarga.muda}</Td>
              <Td>{it.umur_kepala_keluarga.tua}</Td>
              <Td>{it.umur_kepala_keluarga.lansia}</Td>
              <Td>{it.pendapatan.rendah}</Td>
              <Td>{it.pendapatan.sedang}</Td>
              <Td>{it.pendapatan.tinggi}</Td>
              <Td>{it.jumlah_anggota_keluarga.sedikit}</Td>
              <Td>{it.jumlah_anggota_keluarga.banyak}</Td>
              <Td>{it.bantuan}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Penduduk;
