import { Container, Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { InputWihtText } from "../components/InputText";
import { db } from "../config/firebase";

const Tambahpenduduk = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    nik: "",
    nama: "",
    umur: "",
    jumlah_pendapatan: "",
    jumlah_tanggungan: "",
    bantuan: "-",
  });

  const onSubmit = async () => {
    setLoading(true);
    try {
      await db
        .doc(`data-penduduk/${state.nik}`)
        .get()
        .then((docs) => {
          if (docs.exists) {
            toast({
              description: "Nik telah terdaftar",
              status: "error",
            });
            setLoading(false);
            return;
          } else {
            db.doc(`data-penduduk/${state.nik}`).set(state);
            toast({
              description: "Tambah Data Sukses",
              status: "success",
            });
            setLoading(false);
            return;
          }
        });
    } catch (error: any) {
      setLoading(false);
      toast({
        description: "Gagal tambahkan data",
        status: "error",
      });
    }
    setLoading(false);
  };
  return (
    <Container maxW={"container.xl"}>
      <InputWihtText
        title="Nik"
        value={state.nik}
        onChange={(e) => setState((prev) => ({ ...prev, nik: e.target.value }))}
      />
      <InputWihtText
        title="Nama"
        value={state.nama}
        onChange={(e) =>
          setState((prev) => ({ ...prev, nama: e.target.value }))
        }
      />
      <InputWihtText
        title="umur kepala keluarga"
        value={state.umur}
        onChange={(e) =>
          setState((prev) => ({ ...prev, umur: e.target.value }))
        }
      />
      <InputWihtText
        title="jumlah pendapatan"
        value={state.jumlah_pendapatan}
        onChange={(e) =>
          setState((prev) => ({ ...prev, jumlah_pendapatan: e.target.value }))
        }
      />
      <InputWihtText
        title="jumlah tanggungan"
        value={state.jumlah_tanggungan}
        onChange={(e) =>
          setState((prev) => ({ ...prev, jumlah_tanggungan: e.target.value }))
        }
      />
      <Button
        colorScheme={"green"}
        color={"white"}
        mt={10}
        onClick={onSubmit}
        isLoading={loading}
      >
        Tambah
      </Button>
    </Container>
  );
};

export default Tambahpenduduk;
