FROM node:16-alpine

WORKDIR /opt/service
COPY ./ ./
RUN npm install
RUN npm run build
CMD node /opt/service/build/server
