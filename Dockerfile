FROM node:14-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run generate

FROM nginx
COPY /configs/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]