import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useCollectionKVN from "../../hooks/userCollectionKVN";

const Home = () => {

  const { active } = useWeb3React();
  const [maxSupply, setMaxSupply] = useState();

  const collectionKVN = useCollectionKVN()

  const getMaxSupply = useCallback(async () => {
    if (collectionKVN) {
      const result = await collectionKVN.methods.maxSupply().call();
      setMaxSupply(result);
    }
  }, [collectionKVN]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]);

  if (!active) return "Conecta tu wallet.";

  return (
    <>
      <p>Max supply: {maxSupply}</p>
    </>
  );
};

export default Home;
