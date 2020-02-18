FROM node:10 as devel

WORKDIR /opt/service
COPY ./ ./
RUN npm install
RUN npm run build
CMD npm run start

FROM node:10 as prod

WORKDIR /opt/service
COPY --from=devel /opt/service/build ./build
CMD node /opt/service/build/src/server
