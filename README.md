# fluval-manager
Auto-management system for my Fluval Edge aquarium

# Installation
## Installer wiring-pi

https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/

## Rajouter les taches cron

`crontab -e`

`@reboot /home/<user>/fluval-manager/lights/lights.js -configure`

`@hourly /home/<user>/fluval-manager/lights/lights.js &`

## Redémarrer

`sudo reboot`
