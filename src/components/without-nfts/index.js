import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const WithoutNFTs = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      <AlertTitle mr={2}>You don't have NFT yet</AlertTitle>
    </Alert>
  );
};

export default WithoutNFTs;
