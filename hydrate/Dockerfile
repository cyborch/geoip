FROM mariadb:10.8.2

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

RUN apt-get install -y unzip curl

WORKDIR /app

COPY ./download.sh ./
COPY ./import.sql ./

ENTRYPOINT [ "/app/download.sh" ]
