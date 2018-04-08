FROM node:alpine
ENV NODE_VERSION 9.5.0
MAINTAINER  merlin@merlin.com

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN  npm install

EXPOSE 3000
