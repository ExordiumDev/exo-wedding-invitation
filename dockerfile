FROM node:20.14.0 AS build

WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build-stag

FROM node:20.14.0

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY server.js .

RUN npm install express connect-history-api-fallback cors

EXPOSE 8013

CMD ["node", "server.js"]