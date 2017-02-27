# fluval-manager-node
Auto-management system for my Fluval Edge aquarium

# Installation
## Installer wiring-pi

https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/

## Activer les modules

Ajouter les deux lignes suivantes dans le fichier `/etc/modules`

`w1-gpio`
`w1-therm`

## Modifier la configuration du boot

Ajouter la ligne au fichier `/boot/config.txt`

`dtoverlay=w1-gpio,gpiopin=4`

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
