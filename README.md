# dekode

## Prerequirements


* Install [Docker](https://docs.docker.com/install/)
* Install [yarn](https://yarnpkg.com/lang/en/docs/install)
* Install [NodeJS](https://nodejs.org/en/download/)

## RUN

* Api
    1. run locally:
        1. docker-compose up
        2. yarn
        3. yarn start:api
    2. deploy:
    
* Ui
    1. run locally:
        1. yarn
        2. yarn start:ui

* Generate database diagram:
    1. npm i extract-mongo-schema
    2. run admin ( is username ) , test ( is password ):
    ```` 
    node_modules\.bin\extract-mongo-schema -d "mongodb://admin:test@localhost:27017/dekode?authSource=admin" -o schema.html -f html-diagram
    ````

* ./bitcoin-cli decodescript
