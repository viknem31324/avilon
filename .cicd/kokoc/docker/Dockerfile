# Используем официальный Node.js образ на базе Alpine
FROM node:20-alpine as build-stage

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем необходимые пакеты для сборки
RUN apk add --update --no-cache \
    libtool \
    libpng-dev \
    libjpeg \
    libjpeg-turbo-dev \
    jpeg-dev \
    && npm install --global --force yarn \
    && rm -rf /var/cache/apk/* /tmp/*

# Копируем исходный код проекта в контейнер
COPY . .

# Устанавливаем зависимости проекта и билдим его
RUN yarn && yarn generate && yarn cache clean && rm -rf /tmp/*

# Теперь создаем новый этап для продакшн-сервера на базе Nginx
FROM nginx:1.23.2 as production-stage
# Копируем скомпилированные файлы с предыдущего этапа в директорию для Nginx
COPY --from=build-stage /app/.output/public/ /usr/share/nginx/html
COPY --from=build-stage /app/.cicd/kokoc/nginx/default.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80 для Nginx
CMD ["nginx", "-g", "daemon off;"]

