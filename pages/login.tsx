import { Box, Button, Center, Input, VStack } from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import { auth } from "../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");

  const onLogin = async () => {
    await auth
      .signInWithEmailAndPassword(email, passowrd)
      .then((docs) => {
        Router.push("/");
      })
      .catch((e) => console.error(e));
  };

  return (
    <Box>
      <Center>
        <VStack mt={"40vh"}>
          <Input
            type={"email"}
            placeholder="Email"
            borderColor={"black"}
            width={"300px"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type={"password"}
            placeholder="Password"
            borderColor={"black"}
            value={passowrd}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={onLogin}>Login</Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default Login;
