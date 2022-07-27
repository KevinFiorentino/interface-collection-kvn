## NFTs Platform
#### Interface, React & Web3.js

- [collectionkvn.eth](https://app.ens.domains/name/collectionkvn.eth/details)
- [See NFTs on OpenSea](https://testnets.opensea.io/collection/collectionkvn)
- [See on Heroku](https://collection-kvn.herokuapp.com/#/)
- [See on IPFS (opt. 1)](https://bafybeidnakfwvqpncq4a5n7bchri3dbuplosmel3bujtwpewfrmidanb4q.ipfs.infura-ipfs.io/#/)
- [See on IPFS (opt. 2)](https://bafybeidnakfwvqpncq4a5n7bchri3dbuplosmel3bujtwpewfrmidanb4q.ipfs.cf-ipfs.com/#/)
- [See on IPFS (opt. 3)](https://bafybeidnakfwvqpncq4a5n7bchri3dbuplosmel3bujtwpewfrmidanb4q.ipfs.dweb.link/#/)

##### Run project

- `npm run start`

##### Deploy to IPFS

- `npm run build`
- `sh ./deploy-ipfs.sh`

- Last IPFS Hash: `bafybeidnakfwvqpncq4a5n7bchri3dbuplosmel3bujtwpewfrmidanb4q`

##### Deploy to Heroku

- `sudo heroku login`
- `sudo heroku container:login`
- `sudo heroku create collection-kvn`
- `sudo heroku container:push web --app collection-kvn`
- `sudo heroku container:release web --app collection-kvn`
- `heroku open --app collection-kvn`
