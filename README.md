# Rest API with TypeScript + Mongo - Starter Files

## Käytetyt komennot
- `docker init`
- `docker compose up --build`
- `docker compose up --watch`
- `docker build -t mongo_animals .`
- `docker-compose logs mongo-express`



### Docker TypeScriptillä
- `docker init vastaukset`
- `valitse oma alusta`
- `Kun kysyy että buildataanko niin: Y`
- `kysyy build kansiota`
- `Katso mihin TypeScript buildaa ja laita se kansioksi esim dist`
  - `jos laitat väärän niin pitää aloittaa alusta`


#### Luo Docker-verkko
- `docker network create some-network`
- `docker run -d --network some-network --name mongo mongo:latest`
- `docker run --network some-network -e ME_CONFIG_MONGODB_SERVER=mongo -p 8081:8081 mongo-express`


## Yhteydet
  - `Löytyvät compose.yaml tiedostosta`


## kontien listaaminen
- `docker ps`
- `docker ps -a`


