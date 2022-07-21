import { Stack, Heading, Text, Table, Thead, Tr, Th, Td, Tbody, Button, Tag, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCollectionKVNData } from "../../hooks/useCollectionKVNData";
import useCollectionKVN from "../../hooks/useCollectionKVN";
import RequestAccess from "../../components/request-access";
import NFTCard from "../../components/nft-card";
import Loading from "../../components/loading";

const NFT = () => {
  const { active, account, library } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, nft, updateNFT } = useCollectionKVNData(tokenId);
  const collectionKVN = useCollectionKVN();
  const toast = useToast();
  const [transfering, setTransfering] = useState(false);

  const transfer = () => {
    setTransfering(true);

    const address = prompt("Enter the address to transfer the NFT: ");

    const isAddress = library.utils.isAddress(address);

    if (!isAddress) {
      setTransfering(false);
      toast({
        title: 'Transfer error',
        description: 'Invalid address.',
        status: 'error'
      });
    } else {
      collectionKVN.methods.safeTransferFrom(nft.owner, address, nft.tokenId)
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
          setTransfering(false);
          toast({
            title: 'Transaction confirmed',
            description: `The new owner of NFT is ${address}`,
            status: 'success'
          });
          updateNFT();
        })
        .on('error', (error) => {
          setTransfering(false);
          toast({
            title: 'Transaction error',
            description: error.message,
            status: 'error'
          });
        });
    }
  }

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack>
        <NFTCard
          mx={{
            base: "auto",
            md: 0,
          }}
          name={nft.name}
          image={nft.image}
        />
        <Button onClick={transfer} disabled={account !== nft.owner} colorScheme="blue" isLoading={transfering}>
          {account !== nft.owner ? "No eres el dueño" : "Transferir"}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{nft.name}</Heading>
        <Text fontSize="xl">{nft.description}</Text>
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="blue">
            {nft.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="blue">
            {nft.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Attribute</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(nft.attributes).map(([key, value]) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>
                  <Tag>{value}</Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default NFT;
