import React, { useEffect, useState } from "react";
import router from "next/router";
import { db } from "../../config/firebase";
import { Container, Button, toast, useToast } from "@chakra-ui/react";
import { InputWihtText } from "../../components/InputText";

const EditData = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    nik: "",
    nama: "",
    umur: "",
    jumlah_pendapatan: "",
    jumlah_tanggungan: "",
  });

  useEffect(() => {
    async function fetch() {
      await db
        .doc(`data-penduduk/${router.query.nik}`)
        .get()
        .then((docs) => {
          setState({ ...(docs.data() as any) });
        })
        .catch((e) => {
          console.log(e);
        });
    }
    fetch();
  }, []);

  const onSubmit = async (nik: string) => {
    setLoading(true);
    await db
      .doc(`data-penduduk/${nik}`)
      .update(state)
      .then(() => {
        toast({
          description: "Update Data Berhasil",
          status: "success",
        });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
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
        isLoading={loading}
        onClick={() => onSubmit(state.nik)}
      >
        Update
      </Button>
    </Container>
  );
};

export default EditData;
