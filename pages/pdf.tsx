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
import React, { useEffect, useState } from "react";
import { PDFDownloadLink, Document, Page, View } from "@react-pdf/renderer";
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

  const MyDoc = () => (
    <Document>
      <Page>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th colSpan={3}>Umur Kepala Keluarga</th>
              <th colSpan={3}>Pendapatan</th>
              <th colSpan={2}>Jumlah Anggota Keluarga</th>
              <th>Hasil</th>
            </tr>
            <tr>
              <th></th>
              <th scope="col">Muda</th>
              <th scope="col">Tua</th>
              <th scope="col">Lansia</th>
              <th scope="col">Rendah</th>
              <th scope="col">Sedang</th>
              <th scope="col">Tinggi</th>
              <th scope="col">Sedikit</th>
              <th scope="col">Banyak</th>
              <th></th>
            </tr>
          </thead>
        </table>
        {/* <Table variant="striped" size={"sm"}>
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
        </Table> */}
      </Page>
    </Document>
  );

  return (
    <Box>
      {/* {show && (
        <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
          <Button colorScheme={"red"}>Export</Button>
        </PDFDownloadLink>
      )} */}

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
