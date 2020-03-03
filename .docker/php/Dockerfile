FROM php:7.3-fpm-alpine

# Alpine install and update
RUN apk update && apk add openssl

# PHP Extentions
RUN docker-php-ext-install mbstring pdo_mysql

# Workdir container
WORKDIR /var/www

# Remove folder html
RUN rm -rf /var/www/html

# Symbolic link
RUN ln -s public html

# Port
EXPOSE 9000

CMD ["php-fpm"]