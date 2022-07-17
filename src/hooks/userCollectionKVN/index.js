import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import collectionKVN from "../../config/artifacts/CollectionKVN";

const { address, abi } = collectionKVN;

const useCollectionKVN = () => {
  const { active, library, chainId } = useWeb3React();

  const collectionKVN = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return collectionKVN;
}

export default useCollectionKVN;
