# Development and production multi-stage Dockerfile

# ---------- Development Stage ----------
FROM node:16-alpine as dev
WORKDIR /app
COPY ./web/package.json ./web/yarn.lock ./
RUN yarn install
COPY ./web .
EXPOSE 3030
CMD ["yarn", "start:dev"]

# ---------- Production Stage ----------
FROM node:16-alpine as build
WORKDIR /app
COPY ./web .
RUN apk add python3 make g++ && rm -rf /var/cache/apk/*
RUN CI=false yarn install

ARG PORT
ENV PORT $PORT

ARG REACT_APP_BACKEND
ENV REACT_APP_BACKEND $REACT_APP_BACKEND

ARG REACT_APP_STAT_URL
ENV REACT_APP_STAT_URL $REACT_APP_STAT_URL

ARG REACT_APP_COUNTRY_NAME
ENV REACT_APP_COUNTRY_NAME $REACT_APP_COUNTRY_NAME

ARG REACT_APP_COUNTRY_FLAG_URL
ENV REACT_APP_COUNTRY_FLAG_URL $REACT_APP_COUNTRY_FLAG_URL

ARG REACT_APP_COUNTRY_CODE
ENV REACT_APP_COUNTRY_CODE $REACT_APP_COUNTRY_CODE

ARG REACT_APP_MAPBOXGL_ACCESS_TOKEN
ENV REACT_APP_MAPBOXGL_ACCESS_TOKEN $REACT_APP_MAPBOXGL_ACCESS_TOKEN

ARG REACT_APP_MAP_TYPE
ENV REACT_APP_MAP_TYPE $REACT_APP_MAP_TYPE

ARG REACT_APP_ENABLE_REGISTRATION
ENV REACT_APP_ENABLE_REGISTRATION $REACT_APP_ENABLE_REGISTRATION

ARG REACT_APP_GOVERNMENT_MINISTRY
ENV REACT_APP_GOVERNMENT_MINISTRY $REACT_APP_GOVERNMENT_MINISTRY

# Build the app
RUN CI=false yarn build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./web/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY ./web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
