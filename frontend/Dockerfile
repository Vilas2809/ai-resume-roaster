FROM nginx:1.27-alpine

COPY index.html style.css app.js favicon.svg icons.svg config.js /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.d/40-inject-api-url.sh

RUN chmod +x /docker-entrypoint.d/40-inject-api-url.sh

ENV API_BASE_URL=http://127.0.0.1:8000

EXPOSE 80
