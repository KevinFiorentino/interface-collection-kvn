import { useCallback, useEffect, useState } from "react";
import useCollectionKVN from "../useCollectionKVN";

const getNFTData = async ({ collectionKVN, tokenId }) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    collectionKVN.methods.tokenURI(tokenId).call(),
    collectionKVN.methods.tokenDNA(tokenId).call(),
    collectionKVN.methods.ownerOf(tokenId).call(),
    collectionKVN.methods.getAccessoriesType(tokenId).call(),
    collectionKVN.methods.getClotheColor(tokenId).call(),
    collectionKVN.methods.getClotheType(tokenId).call(),
    collectionKVN.methods.getEyeType(tokenId).call(),
    collectionKVN.methods.getEyeBrowType(tokenId).call(),
    collectionKVN.methods.getFacialHairColor(tokenId).call(),
    collectionKVN.methods.getFacialHairType(tokenId).call(),
    collectionKVN.methods.getHairColor(tokenId).call(),
    collectionKVN.methods.getHatColor(tokenId).call(),
    collectionKVN.methods.getGraphicType(tokenId).call(),
    collectionKVN.methods.getMouthType(tokenId).call(),
    collectionKVN.methods.getSkinColor(tokenId).call(),
    collectionKVN.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

// GET ALL NFTs
const useCollectionKVNsData = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionKVN = useCollectionKVN();

  const updateNFTs = useCallback(async () => {
    if (collectionKVN) {
      setLoading(true);

      let tokenIds;

      const totalSupply = await collectionKVN.methods.totalSupply().call();
      tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);

      const nftsPromise = tokenIds.map((tokenId) =>
        getNFTData({ tokenId, collectionKVN })
      );

      const nfts = await Promise.all(nftsPromise);

      setNFTs(nfts);
      setLoading(false);
    }
  }, [collectionKVN]);

  useEffect(() => {
    updateNFTs();
  }, [updateNFTs]);

  return { loading, nfts, updateNFTs };
};


// GET NTF by tokenId
const useCollectionKVNData = (tokenId = null) => {
  const [nft, setNFT] = useState();
  const [loading, setLoading] = useState(true);
  const collectionKVN = useCollectionKVN();

  const updateNFT = useCallback(async () => {
    if (collectionKVN && tokenId != null) {
      setLoading(true);

      const nftToSet = await getNFTData({ collectionKVN, tokenId });
      setNFT(nftToSet);

      setLoading(false);
    }
  }, [collectionKVN, tokenId]);

  useEffect(() => {
    updateNFT();
  }, [updateNFT]);

  return { loading, nft, updateNFT };
}

export { useCollectionKVNsData, useCollectionKVNData };
