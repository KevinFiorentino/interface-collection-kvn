import { Stack, Flex, Heading, Text, Button, Image, Badge, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useCollectionKVN from "../../hooks/useCollectionKVN";

const Home = () => {

  const { active, account } = useWeb3React();
  const toast = useToast();

  const [maxSupply, setMaxSupply] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [imageSrc, setImageSrc] = useState();

  const [isMinting, setIsMinting] = useState(false);

  const collectionKVN = useCollectionKVN();


  /* ********** Max Supply ********** */

  const getMaxSupply = useCallback(async () => {
    if (collectionKVN) {
      const result = await collectionKVN.methods.maxSupply().call();
      setMaxSupply(result);
    }
  }, [collectionKVN]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]);


  /* ********** Total Supply ********** */

  const getTotalSupply = useCallback(async () => {
    if (collectionKVN) {
      const result = await collectionKVN.methods.totalSupply().call();
      setTotalSupply(result);
    }
  }, [collectionKVN]);

  useEffect(() => {
    getTotalSupply();
  }, [getTotalSupply]);


  /* ********** Get Preview Image ********** */

  const getCollectionKVNData = useCallback(async () => {
    if (collectionKVN) {
      const totalSupply = await collectionKVN.methods.totalSupply().call();
      const dnaPreview = await collectionKVN.methods.deterministicPseudoRandomDNA(totalSupply, account).call();
      const image = await collectionKVN.methods.imageByDNA(dnaPreview).call();
      setImageSrc(image);
    }
  }, [collectionKVN, account]);

  useEffect(() => {
    getCollectionKVNData();
  }, [getCollectionKVNData]);


  /* ********** Mint NFT ********** */

  const mint = () => {
    setIsMinting(true);

    collectionKVN.methods.mint().send({
      from: account
    })
    .on('transactionHash', (txHash) => {
      toast({
        title: 'Transacción enviada',
        description: `Hash de la transacción: ${txHash}`,
        status: 'info'
      });
    })
    .on('receipt', () => {
      setIsMinting(false);
      toast({
        title: 'Transacción confirmada',
        description: 'La transacción se confirmó con éxito',
        status: 'success'
      });
      getTotalSupply();
    })
    .on('error', (error) => {
      setIsMinting(false);
      toast({
        title: 'Error en la transacción',
        description: error.message,
        status: 'error'
      });
    });
  };


  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column-reverse", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "green.400",
              zIndex: -1,
            }}
          >
            Un Platzi Punk
          </Text>
          <br />
          <Text as={"span"} color={"green.400"}>
            nunca para de aprender
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          Platzi Punks es una colección de Avatares randomizados cuya metadata
          es almacenada on-chain. Poseen características únicas y sólo hay 100
          en existencia.
        </Text>
        <Text color={"green.500"}>
          Cada Platzi Punk se genera de forma secuencial basado en tu address,
          usa el previsualizador para averiguar cuál sería tu Platzi Punk si
          minteas en este momento
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"green"}
            bg={"green.400"}
            _hover={{ bg: "green.500" }}
            disabled={!collectionKVN}
            onClick={mint}
            isLoading={isMinting}
          >
            Obtén tu punk
          </Button>
          <Link to="/nfts">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galería
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Flex
        flex={1}
        direction="column"
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
      >
        <Image src={active ? imageSrc : "https://avataaars.io/"} />
        {active ? (
          <>
            <Flex mt={2}>
              <Badge>
                Next ID:
                <Badge ml={1} colorScheme="green">
                  {totalSupply}/{maxSupply}
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="green">
                  0x0000...0000
                </Badge>
              </Badge>
            </Flex>
            <Button
              onClick={getCollectionKVNData}
              mt={4}
              size="xs"
              colorScheme="green"
            >
              Actualizar
            </Button>
          </>
        ) : (
          <Badge mt={2}>Wallet desconectado</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
