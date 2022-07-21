import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const RequestAccess = () => {
  return (
    <Alert status="info">
      <AlertIcon />
      <AlertTitle mr={2}>Connect your wallet</AlertTitle>
      <AlertDescription>to see all NFTs.</AlertDescription>
    </Alert>
  );
};

export default RequestAccess;
