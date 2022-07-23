import { Box, Container, Stack, Text, Link, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {

  const style = { textDecoration: 'underline' };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2022 Developed by
            <Link ml={1} href="https://www.linkedin.com/in/kevinfiorentino/" target="_blank" title="LinkedIn Kevin Fiorentino" rel="noopener noreferrer" style={style}>Kevin Fiorentino</Link> —△🌈
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
