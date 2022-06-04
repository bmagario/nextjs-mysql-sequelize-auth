## Create a DOCKERHOST variable to connect between dockers.
# In linux: 
    # export DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
## Create Dockers
docker-compose up -d --build

## Watch Docker's Logs
docker logs -f <DOCKER_HASH>

## Open Docker Bash
docker exec -it <DOCKER_NAME> bash


## Exec Mariadb Commands
docker exec -it <DOCKER_NAME> mysql -h db -u <DB_USER> -p<DB_PASS> <DB_NAME_DEVELOPMENT> -e "SELECT * FROM <TABLE>;"