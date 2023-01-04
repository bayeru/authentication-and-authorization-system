FROM node:alpine as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

ARG REACT_APP_BACKEND_URL

RUN echo $REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

RUN npm prune --production

FROM nginx:alpine

#COPY ./default.conf /etc/nginx/conf.d/

COPY --from=builder ./app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]