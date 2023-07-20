#!/bin/bash
docker exec -it scrolladex-mono-backend-1 bash sh -c "
cd build &&
node ace migration:rollback &&
node ace migration:run &&
node ace db:seed
"
