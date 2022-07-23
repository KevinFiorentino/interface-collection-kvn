import { Stack, Flex, Heading, Text, Button, Image, Badge, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useCollectionKVN from "../../hooks/useCollectionKVN";
import useTruncatedAddress from "../../hooks/useTruncatedAddress";

const Home = () => {

  const { active, account } = useWeb3React();
  const truncatedAddress = useTruncatedAddress(account);
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

    collectionKVN.methods.mint()
      .send({
        from: account
      })
      .on('transactionHash', (txHash) => {
        toast({
          title: 'Transaction sent',
          description: `Transaction hash: ${txHash}`,
          status: 'info'
        });
      })
      .on('receipt', () => {
        setIsMinting(false);
        toast({
          title: 'Transaction confirmed',
          description: 'The transaction was successful',
          status: 'success'
        });
        getTotalSupply();
      })
      .on('error', (error) => {
        setIsMinting(false);
        toast({
          title: 'Transaction error',
          description: error.message,
          status: 'error'
        });
      });
  };

  const style = { textDecoration: 'underline' };

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
              bg: "blue.400",
              zIndex: -1,
            }}
          >
            CollectionKVN
          </Text>
          <br />
          <Text as={"span"} color={"blue.400"}>
            an NFT test platform
          </Text>
        </Heading>
        <Text color={"gray.500"}>
          CollectionKVN is a test platform working with <strong>Ethereum Rinkeby Network</strong> to generate an ERC721 NFT collection.<br></br>
          You can see the <a href="https://github.com/KevinFiorentino/contract-collection-kvn" target="_blank" title="ColletionKVN Smart Contract" style={style} rel="noopener noreferrer">Smart Contract</a> and the <a href="https://github.com/KevinFiorentino/interface-collection-kvn" target="_blank" title="ColletionKVN UI" style={style} rel="noreferrer">UI Code</a>, both open source.
        </Text>
        <Text color={"blue.500"}>
          Each NFT is generated sequentially based on your personal <strong>Metamask wallet address</strong> and there will only be <strong>100</strong> of them.<br></br>
          You can use the preview to see the next NFT you can get for free.
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
            colorScheme={"blue"}
            bg={"blue.400"}
            _hover={{ bg: "blue.500" }}
            disabled={!collectionKVN}
            onClick={mint}
            isLoading={isMinting}
          >
            Get NFT
          </Button>
          <Link to="/nfts">
            <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
              Galery
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
                <Badge ml={1} colorScheme="blue">
                  {totalSupply}/{maxSupply}
                </Badge>
              </Badge>
              <Badge ml={2}>
                Address:
                <Badge ml={1} colorScheme="blue">
                  {truncatedAddress}
                </Badge>
              </Badge>
            </Flex>
            {/* <Button
              onClick={getCollectionKVNData}
              mt={4}
              size="xs"
              colorScheme="blue"
            >
              Refresh
            </Button> */}
          </>
        ) : (
          <Badge mt={2}>Wallet disconnected</Badge>
        )}
      </Flex>
    </Stack>
  );
};

export default Home;
