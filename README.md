# fluval-manager-node
Auto-management system for my Fluval Edge aquarium

# Installation
## Installer wiring-pi

https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/

## Installer node.js

https://nodejs.org/en/

## Installer forever 

`sudo npm install -g forever`

## Intaller forever-service

`sudo npm install -g forever-service`

## Builder le projet

`cd fluval-manager`
`npm run build`

## Installer le script de démarrage

`sudo forever-service install fluval-manager -s dist/src/www.js -e "PORT=8080 ENV=prod" -r nicolas --noGracefulShutdown`

## Redémarrer

`sudo reboot`
