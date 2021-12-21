import {
  Container,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
  HStack,
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

  const [state, setState] = useState({
    nik: "",
    nama: "",
    umur: "",
    jumlah_pendapatan: "",
    jumlah_tanggungan: "",
    bantuan: "",
  });

  // useEffect(() => {
  //   console.log(`Muda - ${muda}, Tua - ${tua}, Lansia - ${lansia}`);
  //   console.log(`Rendah - ${muda}, Menengah - ${tua}, Tinggi - ${lansia}`);
  //   console.log(`Sedikit - ${sedikit}, Banyak - ${banyak}`);
  // }, [tua, lansia, muda, rendah, sedang, tinggi, sedikit, banyak]);

  const handleClick = async () => {
    setLoadFetch(true);
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

    // RENDAH
    if (PENDAPATAN >= 3000000) {
      setRendah(0);
    } else if (PENDAPATAN >= 2000000 && PENDAPATAN <= 3000000) {
      const num1 = 3000000 - PENDAPATAN;
      const num2 = 3000000 - 2000000;
      const hasil = num1 / num2;
      setRendah(hasil);
    } else if (PENDAPATAN <= 2000000) setRendah(1);

    // MENENGAH
    if (PENDAPATAN <= 2000000 || PENDAPATAN >= 4000000) {
      setSedang(0);
    } else if (PENDAPATAN >= 2000000 && PENDAPATAN >= 4000000) {
      const num1 = PENDAPATAN - 2000000;
      const num2 = 3000000 - 2000000;
      const hasil = num1 / num2;
      setSedang(hasil);
    } else if (PENDAPATAN >= 3000000 && PENDAPATAN <= 4000000) {
      const num1 = 4000000 - PENDAPATAN;
      const num2 = 4000000 - 3000000;
      const hasil = num1 / num2;
      setSedang(hasil);
    }

    // TINGGI

    if (PENDAPATAN <= 3000000) setTinggi(0);
    if (PENDAPATAN >= 3000000 && PENDAPATAN <= 4000000) {
      const num1 = PENDAPATAN - 3000000;
      const num2 = 4000000 - 3000000;
      const hasil = num1 / num2;
      setTinggi(hasil);
    }
    if (PENDAPATAN >= 4000000) setTinggi(1);
  };

  const Count = async () => {
    const UMUR = Number(state.umur);
    // Muda
    if (UMUR >= 50) {
      setMuda(0);
    } else if (UMUR >= 40 && UMUR <= 50) {
      const num1 = 50 - UMUR;
      const num2 = 50 - 40;
      const hasil = num1 / num2;
      setMuda(hasil);
    } else if (UMUR <= 40) {
      setMuda(1);
    }

    // Tua

    if (UMUR <= 40 || UMUR >= 60) {
      setTua(0);
    } else if (UMUR >= 40 && UMUR <= 50) {
      const num1 = UMUR - 40;
      const num2 = 50 - 40;
      const hasil = num1 / num2;

      setTua(hasil);
    } else if (UMUR >= 50 && UMUR <= 60) {
      const num1 = 60 - UMUR;
      const num2 = 60 - 50;
      const hasil = num1 / num2;
      setTua(hasil);
    }

    // Lansia

    if (UMUR <= 50) {
      setLansia(0);
    } else if (UMUR >= 50 && UMUR <= 60) {
      const num1 = UMUR - 50;
      const num2 = 60 - 50;
      const hasil = num1 / num2;
      setLansia(hasil);
    } else if (UMUR >= 60) {
      setLansia(1);
    }
  };

  const JumlahTanggungan = async () => {
    const TANGGUNGAN = Number(state.jumlah_tanggungan);

    if (TANGGUNGAN >= 6) {
      setSedikit(0);
    } else if (TANGGUNGAN >= 4 && TANGGUNGAN <= 6) {
      const num1 = 6 - TANGGUNGAN;
      const num2 = 6 - 4;
      const hasil = num1 / num2;
      setSedikit(hasil);
    }
    if (TANGGUNGAN <= 4) setSedikit(1);

    // BANYAK;
    if (TANGGUNGAN <= 4) setBanyak(0);
    if (TANGGUNGAN >= 4 && TANGGUNGAN <= 6) {
      const num1 = TANGGUNGAN - 4;
      const num2 = 6 - 4;
      const hasil = num1 / num2;
      setBanyak(hasil);
    }
    if (TANGGUNGAN >= 6) setBanyak(1);
  };

  const COUNTING = async () => {
    setLoadHitung(true);
    await Count();
    await HitungPendapatan();
    await JumlahTanggungan();
    if (muda > 0 && rendah > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (muda > 0 && sedang > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (tua > 0 && rendah > 0 && sedikit > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (tua > 0 && rendah > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (tua > 0 && sedang > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && rendah > 0 && sedikit > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && rendah > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && sedang > 0 && sedikit > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && sedang > 0 && sedikit > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && sedang > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && tinggi > 0 && sedikit > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else if (lansia > 0 && tinggi > 0 && banyak > 0) {
      setState((pre) => ({ ...pre, bantuan: "Dapat Bantuan" }));
    } else {
      setState((pre) => ({ ...pre, bantuan: "Tidak Dapat Bantuan" }));
    }
    setLoadHitung(false);
  };

  const onSave = async () => {
    setLoading(true);
    await db
      .doc(`data-penduduk/${state.nik}`)
      .update({
        ...state,
        bantuan: state.bantuan,
        umur_kepala_keluarga: { muda, tua, lansia },
        pendapatan: { rendah, sedang, tinggi },
        jumlah_anggota_keluarga: { sedikit, banyak },
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
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleClick}
            isLoading={loadFetch}
          >
            Cari
          </Button>
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
        <Button
          colorScheme={"red"}
          color={"white"}
          onClick={COUNTING}
          isLoading={loadHitung}
        >
          Hitung
        </Button>
        <Button
          colorScheme={"green"}
          color={"white"}
          onClick={onSave}
          isLoading={loading}
        >
          Seleksi
        </Button>
      </HStack>
    </Container>
  );
};

export default Perhitungan;