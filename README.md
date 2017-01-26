# fluval-manager
Auto-management system for my Fluval Edge aquarium

# Installation
## Installer wiring-pi

https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/

## Copier le fichier scripts/fluval-manager dans /etc/init.d

`sudo cp scripts/fluval-manager /etc/init.d/fluval-manager`

`sudo chmod +x /etc/init.d/fluval-manager`

## Ajouter le service au demarrage automatique

`sudo update-rc.d fluval-manager defaults`

## Rajouter les taches cron

`crontab -e`

`@reboot /home/<user>/fluval-manager/lights/lights.js -configure`

`@hourly /home/<user>/fluval-manager/lights/lights.js &`

## Redémarrer

`sudo reboot`
