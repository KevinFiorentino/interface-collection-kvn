import { Stack, Heading, Text, Table, Thead, Tr, Th, Td, Tbody, Button, Tag } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import RequestAccess from "../../components/request-access";
import NFTCard from "../../components/nft-card";
import { useCollectionKVNData } from "../../hooks/useCollectionKVNData";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";

const NFT = () => {
  const { active, account } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, nft } = useCollectionKVNData(tokenId);

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
        <Button disabled={account !== nft.owner} colorScheme="green">
          {account !== nft.owner ? "No eres el dueño" : "Transferir"}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{nft.name}</Heading>
        <Text fontSize="xl">{nft.description}</Text>
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="green">
            {nft.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {nft.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Atributo</Th>
              <Th>Valor</Th>
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
