# FROM node:20.14.0 AS build

# WORKDIR /app

# COPY . ./
# RUN npm install
# RUN npm run build-prod
# RUN rm -rf node_modules

# FROM node:20.14.0

# WORKDIR /app

# COPY --from=build /app/dist .

# RUN npm install --g http-server

# EXPOSE 8001

# CMD ["npx", "http-server", "-p", "8001","--fallback","index.html"]

 ====================================================================
FROM node:20.14.0 AS build

WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build-prod

FROM node:20.14.0

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY server.js .

RUN npm install express connect-history-api-fallback cors

EXPOSE 8001

CMD ["node", "server.js"]
