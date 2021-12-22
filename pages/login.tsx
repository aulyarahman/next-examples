import {
  Box,
  Button,
  Center,
  Input,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import { auth } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    await auth
      .signInWithEmailAndPassword(email, passowrd)
      .then((docs) => {
        Router.push("/");
      })
      .catch((e) => console.error(e));
    setLoading(false);
  };

  return (
    <Box bg="#12B2B3" h={"100vh"}>
      <VStack spacing={10}>
        <Heading
          w={600}
          textAlign={"center"}
          mt={"10vh"}
          color={"white"}
          textTransform={"capitalize"}
        >
          Sistem pendukung keputusan penerima bantuan kartu keluarga sejahtera
          (KKS)
        </Heading>
        <VStack
          mt={"30vh"}
          align={"stretch"}
          spacing={5}
          bg={"gray.100"}
          p={10}
          rounded={"xl"}
          shadow={"md"}
        >
          <VStack align={"start"}>
            <Text fontWeight={"bold"}>Email</Text>
            <Input
              type={"email"}
              placeholder="Email"
              borderColor={"black"}
              width={"400px"}
              borderWidth={"2px"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </VStack>

          <VStack align={"start"}>
            <Text fontWeight={"bold"}>Password</Text>
            <Input
              type={"password"}
              placeholder="Password"
              width={"400px"}
              borderColor={"black"}
              borderWidth={"2px"}
              value={passowrd}
              onChange={(e) => setPassword(e.target.value)}
            />
          </VStack>

          <Button
            mt={10}
            onClick={onLogin}
            isLoading={loading}
            bg="#12B2B3"
            color={"white"}
          >
            Login
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Login;
