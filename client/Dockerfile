FROM node:18 as build
WORKDIR /app
COPY package*.json ./
ADD https://cdnjs.cloudflare.com/ajax/libs/primereact/10.6.6/resources/themes/soho-dark/theme.min.css ./soho-dark.css
ADD https://cdnjs.cloudflare.com/ajax/libs/primereact/10.6.6/resources/themes/soho-light/theme.min.css ./soho-light.css
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]