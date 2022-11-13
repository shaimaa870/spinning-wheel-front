FROM node:10-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build --prod
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html