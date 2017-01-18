# fluval-manager
Auto-management system for my Fluval Edge aquarium

# Installation
## Installer wiring-pi

https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/

## Rajouter deux taches cron

`crontab -e`

`* * * * * /home/nicolas/devel/fluval-manager/fluval-manager 2>&1`

`@reboot /home/nicolas/devel/fluval-manager/fluval-manager 2>&1`

## Redémarrer

`sudo reboot`
