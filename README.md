
sudo docker run -p 5432:5432 -v /tmp/database:/var/lib/postgresql/data -e POSTGRES_PASSWORD=1234 -d postgres
sudo docker container ls 
sudo docker exec -it ccd3c2fc50b9 bash

psql -h localhost -U postgres

CREATE DATABASE dbname;

get conenction information
 \conninfo

get use information
\du

list data bases
\dt

list tables
\l

connect to database
 \c dbname



set keyboar color 
sudo brightnessctl --device='dell::kbd_backlight' set 1

