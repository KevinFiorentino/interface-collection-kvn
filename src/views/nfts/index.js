import { useState } from "react";
import './nfts.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Grid, InputGroup, InputLeftElement, Input, InputRightElement, Button, FormHelperText, FormControl, Heading } from "@chakra-ui/react";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import NFTCard from "../../components/nft-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";
import { useCollectionKVNsData } from "../../hooks/useCollectionKVNData";

const NFTs = () => {
  const { search } = useLocation();
  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const navigate = useNavigate();
  const { active, library } = useWeb3React();
  const { nfts, loading } = useCollectionKVNsData({
    owner: submitted && validAddress ? address : null,
  });

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();

    if (address) {
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) navigate(`/nfts?address=${address}`);
    } else {
      navigate("/nfts");
    }
  };

  if (!active) {
    return (
      <>
        <Heading color="blue.500" mb="3">Galery</Heading>
        <RequestAccess />
      </>
    );
  }

  return (
    <>
      <Heading color="blue.500" mb="3">Galery</Heading>
      <div class="collection-wrapper">
        <a className="collection-wrapper-btn" href="https://testnets.opensea.io/collection/collectionkvn" target="_blank" rel="noopener noreferrer">
          See all in OpenSea <ExternalLinkIcon mb="1" />
        </a>
      </div>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              isInvalid={false}
              value={address ?? ""}
              onChange={handleAddressChange}
              placeholder="Search by address"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText color="red" mb="2">Invalid address</FormHelperText>
          )}
        </FormControl>
      </form>
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
