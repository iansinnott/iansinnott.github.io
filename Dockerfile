FROM node:lts-alpine

WORKDIR /opt/build
COPY . .

RUN yarn install

CMD yarn build
