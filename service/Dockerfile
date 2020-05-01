FROM node:10

WORKDIR /opt/service
COPY ./ ./
RUN npm install
RUN npm run build
CMD node /opt/service/build/server
