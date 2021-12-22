/* eslint-disable react/no-children-prop */
import {
  useDisclosure,
  Flex,
  useColorModeValue,
  Icon,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Text,
  Avatar,
  HStack,
  Spacer,
  VStack,
  Button,
  Center,
  Divider,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import router from "next/router";
import { FiMenu, FiHome, FiPlus, FiClipboard } from "react-icons/fi";
import { auth } from "../config/firebase";

interface SidebarContentProps {
  children: ReactNode;
}

export default function SidebarContents(props: SidebarContentProps) {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();

  const NavItem = (props: any) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={"gray.50"}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontSize={"16px"}
        fontWeight="semibold"
        onClick={() => router.push(props.link)}
        transition=".15s ease"
        {...rest}
      >
        {icon && <Icon mx="2" boxSize="4" as={icon} fontSize={"20px"} />}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      shadow={"xl"}
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="#12B2B3"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <VStack px="4" py="5" align="center">
        {/* <Logo /> */}
        <Text fontSize="2xl" ml="2" color={"gray.50"} fontWeight="bold">
          SISTEM CERDAS
        </Text>
        <Divider />
      </VStack>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={FiHome} link="/penduduk">
          Penduduk
        </NavItem>
        <NavItem icon={FiClipboard} link="/kalkulasi">
          Hasil Perhitungan
        </NavItem>
      </Flex>
      <Flex pos={"absolute"} bottom={5} p={4}>
        <Button
          w={200}
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          py={8}
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
          shadow={"lg"}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Spacer />
          <HStack>
            <Text color="black">{auth.currentUser?.email}</Text>
            <Avatar name={String(auth.currentUser?.displayName)} />
          </HStack>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
