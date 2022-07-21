import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const RequestAccess = () => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Conecta tu wallet</AlertTitle>
      <AlertDescription>para acceder a la app</AlertDescription>
    </Alert>
  );
};

export default RequestAccess;
