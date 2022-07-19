import { useWeb3React } from "@web3-react/core";
import { Grid } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import NFTCard from "../../components/nft-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { useCollectionKVNsData } from "../../hooks/useCollectionKVNData";

const NFTs = () => {
  const { active } = useWeb3React();
  const { nfts, loading } = useCollectionKVNsData();

  if (!active) return <RequestAccess />;

  return (
    <>
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

export default NFTs;
