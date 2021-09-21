# AutoThreader
Autothreader is a discord bot for automatically creating threads when new messages are posted in one or more specific channels.\
Just a simple bot i made for trying out the new slash commands in discord.js v13

To run the bot you can either use docker to run it in a container or run it normally.
## Run Normally
Create a file called ".env" in the same folder as this repo and fill it with the following contents:
```
BOT_TOKEN=replaceMeWithTheBotsToken
BOT_CLIENTID=replaceMeWithTheBotsClientId
```
Then proceed to run `npm install` and then `node deploy-commands` to register the slash commands. Finally run `node App.js` to start the bot.


## Run in docker container
Clone this repository in any folder and then run `docker build . -t threaderbot`. Let it finish building and once it's finished you can delete all the files if you want.\
To run the docker container you can create a "docker-compose.yml" file in any directory and then fill it with:
```
version: '3.7'
services:
  threaderBot:
    image: threaderbot
    environment:
      BOT_TOKEN: "replaceMeWithTheBotsToken"
      BOT_CLIENTID: "replaceMeWithTheBotsClientId"
    volumes:
      - ./storage/:/app/storage/
```
You can then run the bot with `docker-compose up -d` and stop it with `docker-compose down` or `docker-compose stop`
