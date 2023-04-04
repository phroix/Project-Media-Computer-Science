#!/bin/sh

(sleep 10s && npm start --prefix /home/arne/Dokumente/projekt-medieninformatik-kaffeekasse/backend) &
(sleep 20s && python3 /home/arne/Dokumente/Dokumente/projekt-medieninformatik-kaffeekasse/Raspi/api.py) &
(sleep 30s && npm start --prefix /home/arne/Dokumente/projekt-medieninformatik-kaffeekasse/frontend) &

exit 0