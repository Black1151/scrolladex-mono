#!/bin/bash
docker exec -it scrolladex-mono-backend-1 sh -c "
cd build &&
node ace migration:rollback &&
node ace migration:run &&
node ace db:seed
"
