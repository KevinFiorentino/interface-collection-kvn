import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const RequestAccess = () => {
  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle mr={2}>Connect your  Metamask Wallet to see all NFTs.</AlertTitle>
    </Alert>
  );
};

export default RequestAccess;
