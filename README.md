## NFTs Platform
#### Interface, React & Web3.js

[See on Heroku](https://collection-kvn.herokuapp.com/#/)
[See on IPFS](https://bafybeidnakfwvqpncq4a5n7bchri3dbuplosmel3bujtwpewfrmidanb4q.ipfs.infura-ipfs.io/#/)
[OpenSea NFTs](https://testnets.opensea.io/collection/collectionkvn)

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
