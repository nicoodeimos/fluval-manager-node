# fluval-manager
Auto-management system for my Fluval Edge aquarium

# Installation
## Installer wiring-pi

https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/

## Rajouter les taches cron

`crontab -e`

`@reboot /home/nicolas/devel/fluval-manager/fluval-manager -configure`

`@hourly /home/nicolas/devel/fluval-manager/fluval-manager &`

## Redémarrer

`sudo reboot`
