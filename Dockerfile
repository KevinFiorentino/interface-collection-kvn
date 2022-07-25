FROM node:14-stretch as node
WORKDIR /app
COPY ./package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
