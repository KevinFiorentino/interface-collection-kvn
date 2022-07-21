import { useWeb3React } from "@web3-react/core";
import { Grid, Heading } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import NFTCard from "../../components/nft-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { useCollectionKVNsMyData } from "../../hooks/useCollectionKVNData";

const MyNFTs = () => {
  const { active } = useWeb3React();
  const { nfts, loading } = useCollectionKVNsMyData();

  if (!active) return <RequestAccess />;

  return (
    <>
      <Heading color="blue.500" mb="3">My NFTs</Heading>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {nfts.map(({ name, image, tokenId }) => (
            <Link key={tokenId} to={`/nfts/${tokenId}`}>
              <NFTCard image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};

export default MyNFTs;
