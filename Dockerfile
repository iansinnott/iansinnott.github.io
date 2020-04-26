FROM node:lts-alpine

WORKDIR /opt/build
COPY . .

CMD yarn install
CMD yarn build
