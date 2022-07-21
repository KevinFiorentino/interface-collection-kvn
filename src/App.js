import { Routes, Route } from 'react-router-dom';
import Home from './views/home';
import MyNFTs from './views/my-nfts';
import NFTs from './views/nfts';
import NFT from './views/nft';
import MainLayout from "./layouts/main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/my-nfts" exact element={<MyNFTs/>} activeClassName="red" />
        <Route path="/nfts" exact element={<NFTs/>} />
        <Route path="/nfts/:tokenId" exact element={<NFT/>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
