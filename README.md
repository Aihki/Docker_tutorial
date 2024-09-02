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

Aluksi ollaan lähetty docker init komennolla asentamaan dockeria node projectiin. Siinä valitaan alusta. Tässä ollaan valittu nodejs alustaksi. Ensimmäinen ero tunti esimerkkiin tuli siitä kun valitsemani projecti oli typescriptillä tehty niin valitsin sen. Tässä pitää valita se kansio mihin buildi menee esimerksi dist tässä tapauksessa. Tässä vaiheessa kannattaa katsoa mitä packake.jsosonissa on startissa että se käynnistää oikean index.js.

#### Luo Docker-verkko
- `docker network create some-network`
- `docker run -d --network some-network --name mongo mongo:latest`
- `docker run --network some-network -e ME_CONFIG_MONGODB_SERVER=mongo -p 8081:8081 mongo-express`

ensiksi loin uuden docker verkon. Tämän jälkeen käynistin Mongo-db tehdyn kontin ja liitin sen tekemääni verkkoon sekä annoin kontille nimen. Lopussa käynnisti viellä uudelleen ja tein muuten samat kun edellisessa mutta asetin ympäristömuuttujan ja kerroin missä osoitteessa se aukeaa ja määritin käytettävän kuvan.


## Yhteydet
  - `Löytyvät compose.yaml tiedostosta`


## kontien listaaminen
- `docker ps`
- `docker ps -a`
Näillä voi katsoa ensimmäisellä voi katsoa mitkä kaikki kontit ovat käytössä ja toisella voi katsoa myös niitä mitkä eivät ole käytössä.


