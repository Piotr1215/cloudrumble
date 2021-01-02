.PHONY: run run-mini build build-mini

default: run

run:
	docker run -itp 3000:3000 --name=docsify -v $(pwd):/docs piotrzan/dcaguide

run-mini:
	docker run -itp 3000:3000 --name=docsify-mini -v $(pwd):/docs piotrzan/dcaguide:mini

build:
	docker build -f Dockerfile -t piotrzan/dcaguide .

build-mini:
	docker build -f Dockerfile.mini -t piotrzan/dcaguide:mini .