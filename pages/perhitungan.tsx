import { Search2Icon } from "@chakra-ui/icons";
import {
  Container,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { InputWihtText } from "../components/InputText";
import { db } from "../config/firebase";

const Perhitungan = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loadFetch, setLoadFetch] = useState(false);
  const [loadHitung, setLoadHitung] = useState(false);
  // UMUR
  const [muda, setMuda] = useState(0);
  const [tua, setTua] = useState(0);
  const [lansia, setLansia] = useState(0);

  // PENDAPATAN
  const [rendah, setRendah] = useState(0);
  const [sedang, setSedang] = useState(0);
  const [tinggi, setTinggi] = useState(0);

  // TANGGUNGAN
  const [sedikit, setSedikit] = useState(0);
  const [banyak, setBanyak] = useState(0);

  const [finish, setFinish] = useState(true);

  const [state, setState] = useState({
    nik: "",
    nama: "",
    umur: "",
    jumlah_pendapatan: "",
    jumlah_tanggungan: "",
    bantuan: "",
  });

  const handleClick = async () => {
    setLoadFetch(true);
    if (state.nik === "") {
      setLoadFetch(false);
      toast({ description: "Masukkan Nik Terlebih Dahulu!", status: "error" });
      return;
    }
    await db
      .doc(`data-penduduk/${state.nik}`)
      .get()
      .then((docs) => {
        setState({ ...(docs.data() as any) });
      })
      // .then(() => {
      //   COUNTING();
      // })
      .catch((e) => console.error(e));
    setLoadFetch(false);
  };

  const HitungPendapatan = async () => {
    const PENDAPATAN = Number(state.jumlah_pendapatan);

    let RENDAH = 0;
    let SEDANG = 0;
    let TINGGI = 0;

    // RENDAH
    if (PENDAPATAN >= 3000000) {
      // setRendah(0);
      RENDAH = 0;
    } else if (PENDAPATAN >= 2000000 && PENDAPATAN <= 3000000) {
      const num1 = 3000000 - PENDAPATAN;
      const num2 = 3000000 - 2000000;
      const hasil = num1 / num2;
      // setRendah(hasil);
      RENDAH = hasil;
    } else if (PENDAPATAN <= 2000000) RENDAH = 1;

    // MENENGAH
    if (PENDAPATAN <= 2000000 || PENDAPATAN >= 4000000) {
      SEDANG = 0;
    } else if (PENDAPATAN >= 2000000 && PENDAPATAN <= 3000000) {
      const num1 = PENDAPATAN - 2000000;
      const num2 = 3000000 - 2000000;
      const hasil = num1 / num2;
      setSedang(hasil);
      SEDANG = hasil;
    } else if (PENDAPATAN >= 3000000 && PENDAPATAN <= 4000000) {
      const num1 = 4000000 - PENDAPATAN;
      const num2 = 4000000 - 3000000;
      const hasil = num1 / num2;
      setSedang(hasil);
      SEDANG = hasil;
    }

    // TINGGI
    if (PENDAPATAN <= 3000000) setTinggi(0);
    else if (PENDAPATAN >= 3000000 && PENDAPATAN <= 4000000) {
      const num1 = PENDAPATAN - 3000000;
      const num2 = 4000000 - 3000000;
      const hasil = num1 / num2;
      setTinggi(hasil);
      TINGGI = hasil;
    } else if (PENDAPATAN >= 4000000) TINGGI = 1;

    return {
      SEDANG,
      TINGGI,
      RENDAH,
    };
  };

  const UmurCount = async () => {
    const UMUR = Number(state.umur);

    let MUDA = 0;
    let TUA = 0;
    let LANSIA = 0;
    // Muda
    if (UMUR >= 50) {
      MUDA = 0;
    } else if (UMUR >= 40 && UMUR <= 50) {
      const num1 = 50 - UMUR;
      const num2 = 50 - 40;
      const hasil = num1 / num2;
      MUDA = hasil;
    } else if (UMUR <= 40) {
      MUDA = 1;
    }

    // Tua

    if (UMUR <= 40 || UMUR >= 60) {
      TUA = 0;
    } else if (UMUR >= 40 && UMUR <= 50) {
      const num1 = UMUR - 40;
      const num2 = 50 - 40;
      const hasil = num1 / num2;

      TUA = hasil;
    } else if (UMUR >= 50 && UMUR <= 60) {
      const num1 = 60 - UMUR;
      const num2 = 60 - 50;
      const hasil = num1 / num2;
      TUA = hasil;
    }

    // Lansia

    if (UMUR <= 50) {
      LANSIA = 0;
    } else if (UMUR >= 50 && UMUR <= 60) {
      const num1 = UMUR - 50;
      const num2 = 60 - 50;
      const hasil = num1 / num2;
      LANSIA = hasil;
    } else if (UMUR >= 60) {
      LANSIA = 1;
    }

    return {
      MUDA,
      TUA,
      LANSIA,
    };
  };

  const JumlahTanggungan = async () => {
    const TANGGUNGAN = Number(state.jumlah_tanggungan);

    let SEDIKIT = 0;
    let BANYAK = 0;

    if (TANGGUNGAN >= 6) {
      SEDIKIT = 0;
    } else if (TANGGUNGAN >= 4 && TANGGUNGAN <= 6) {
      const num1 = 6 - TANGGUNGAN;
      const num2 = 6 - 4;
      const hasil = num1 / num2;
      SEDIKIT = hasil;
    }
    if (TANGGUNGAN <= 4) SEDIKIT = 1;

    // BANYAK;
    if (TANGGUNGAN <= 4) BANYAK = 0;
    if (TANGGUNGAN >= 4 && TANGGUNGAN <= 6) {
      const num1 = TANGGUNGAN - 4;
      const num2 = 6 - 4;
      const hasil = num1 / num2;
      BANYAK = hasil;
    }
    if (TANGGUNGAN >= 6) BANYAK = 1;

    return {
      SEDIKIT,
      BANYAK,
    };
  };

  const counts = async () => {
    await UmurCount();
    await HitungPendapatan();
    await JumlahTanggungan();
    let BANTUAN = "";
    if (
      (await UmurCount()).MUDA > 0 &&
      (await HitungPendapatan()).RENDAH > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).MUDA > 0 &&
      (await HitungPendapatan()).SEDANG > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).TUA > 0 &&
      (await HitungPendapatan()).RENDAH > 0 &&
      (await JumlahTanggungan()).SEDIKIT > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).TUA > 0 &&
      (await HitungPendapatan()).RENDAH > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).TUA > 0 &&
      (await HitungPendapatan()).SEDANG > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).RENDAH > 0 &&
      (await JumlahTanggungan()).SEDIKIT > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).RENDAH > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).SEDANG > 0 &&
      (await JumlahTanggungan()).SEDIKIT > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).SEDANG > 0 &&
      (await JumlahTanggungan()).SEDIKIT > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).SEDANG > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).TINGGI > 0 &&
      (await JumlahTanggungan()).SEDIKIT > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else if (
      (await UmurCount()).LANSIA > 0 &&
      (await HitungPendapatan()).TINGGI > 0 &&
      (await JumlahTanggungan()).BANYAK > 0
    ) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
      BANTUAN = "Dapat Bantuan";
    } else {
      setState((pre) => ({ ...pre, bantuan: "Tidak Dapat Bantuan" }));
      BANTUAN = "Tidak Dapat Bantuan";
    }

    return { BANTUAN };
  };

  const onSave = async () => {
    setLoading(true);
    if (state.nik === "") {
      setLoading(false);
      toast({ description: "Masukkan Nik Terlebih Dahulu!", status: "error" });
      return;
    }
    // await promise;
    const promise = new Promise(async (resolve, reject) => {
      for (let i = 0; i < 5; i++) {
        // do something
        counts();
        if (i == 4) {
          resolve(i);
        }
      }
    });

    await promise;

    await db
      .doc(`data-penduduk/${state.nik}`)
      .update({
        ...state,
        bantuan: (await counts()).BANTUAN,
        umur_kepala_keluarga: {
          muda: (await UmurCount()).MUDA,
          tua: (await UmurCount()).TUA,
          lansia: (await UmurCount()).LANSIA,
        },
        pendapatan: {
          rendah: (await HitungPendapatan()).RENDAH,
          sedang: (await HitungPendapatan()).SEDANG,
          tinggi: (await HitungPendapatan()).TINGGI,
        },
        jumlah_anggota_keluarga: {
          sedikit: (await JumlahTanggungan()).SEDIKIT,
          banyak: (await JumlahTanggungan()).BANYAK,
        },
      })
      .then(() => {
        toast({ description: "Berhasil Kalkulasi", status: "success" });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  return (
    <Container maxW={"container.xl"}>
      <Text textTransform={"uppercase"}>NIK</Text>
      <InputGroup size="md" width={"400px"}>
        <Input
          pr="4.5rem"
          borderColor={"black"}
          value={state.nik}
          onChange={(e) =>
            setState((prev) => ({ ...prev, nik: e.target.value }))
          }
        />
        <InputRightElement width="4.5rem">
          <IconButton
            h="1.75rem"
            w={"3rem"}
            size="sm"
            borderWidth={"1.5px"}
            borderColor={"black"}
            onClick={handleClick}
            isLoading={loadFetch}
            aria-label="Search database"
            icon={<Search2Icon />}
          />
        </InputRightElement>
      </InputGroup>
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

      <HStack spacing={2} mt={5}>
        {/* <Button
          colorScheme={"red"}
          color={"white"}
          onClick={COUNTING}
          isLoading={loadHitung}
        >
          Hitung
        </Button> */}
        <Button
          colorScheme={"green"}
          color={"white"}
          onClick={onSave}
          isLoading={loading}
        >
          Analisis
        </Button>
      </HStack>
    </Container>
  );
};

export default Perhitungan;
