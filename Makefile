.PHONY: run run-debug

default: run

run:
	docker run -itp 3000:3000 --name=docsify -v $(pwd):/docs piotrzan/dcaguide

run-debug:
	docker run -itp 3000:3000 --name=docsify -v $(pwd):/docs piotrzan/dcaguide /bin/bash