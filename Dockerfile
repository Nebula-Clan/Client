FROM node:11.13.0-alpine

# create destination directory
RUN mkdir -p /usr/src/huddle
WORKDIR /usr/src/huddle

# update and install dependency
RUN apk update && apk upgrade
RUN apk add g++ make python git

# copy the app, note .dockerignore
COPY package.json /usr/src/huddle
RUN npm install

COPY . /usr/src/huddle

RUN npm run build

RUN npm run generate

EXPOSE 80

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80

CMD [ "npm", "start" ]
