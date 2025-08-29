FROM node:20.14.0 AS build

WORKDIR /app

COPY . ./
RUN npm install
RUN npm run build-prod
RUN rm -rf node_modules

FROM node:20.14.0

WORKDIR /app

COPY --from=build /app/dist .

RUN npm install --g http-server

EXPOSE 8001

CMD ["npx", "http-server", "-p", "8001","--fallback","index.html"]

#  ====================================================================

# FROM node:20.14.0

# WORKDIR /app

# COPY dist /app/dist

# RUN npm install express connect-history-api-fallback cors
# COPY server.js .

# EXPOSE 8013

# CMD ["node", "server.js"]
