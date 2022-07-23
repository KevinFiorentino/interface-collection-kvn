import { Box, Flex, HStack, IconButton, useDisclosure, useColorModeValue, Stack, Heading } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useWeb3React } from "@web3-react/core";
import NavLink from "./nav-link";
import Footer from "./footer";
import WalletData from "./wallet-data";

const LinksOnline = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Galery",
    to: "/nfts",
  },
  {
    name: "My NFTs",
    to: "/my-nfts",
  },
];

const LinksOffline = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Galery",
    to: "/nfts",
  }
];

const MainLayout = ({ children }) => {

  let navbarLinks = [];
  const { active } = useWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure();

  navbarLinks = active ? LinksOnline : LinksOffline;

  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        maxW={"7xl"}
        width="100%"
        bg={useColorModeValue("white", "gray.800")}
        px={4}
      >
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Flex alignItems="center">
              <Heading size="md" color="#3182CE" mt={0.2} ml={1}>
                <img src="./logo-collection-kvn.png" alt="CollectionKVN Logo"></img>
              </Heading>
            </Flex>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {navbarLinks.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <WalletData />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {navbarLinks.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
