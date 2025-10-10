FROM node:lts-alpine as builder
WORKDIR /dcm-monitor-ui
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
EXPOSE 4000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /dcm-monitor-ui/dist /usr/share/nginx/html
