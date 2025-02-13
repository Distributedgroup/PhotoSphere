# Using an official PHP image with Apache
FROM php:8.2-apache

# Install necessary extensions to work
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libssl-dev \
    unzip \
    && docker-php-ext-configure gd \
    && docker-php-ext-install gd

# Install MongoDB Extension for PHP
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer inside the container
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy files from the microservice to the container
COPY . /var/www/html

# Installing Composer Dependencies
RUN composer install --no-dev --optimize-autoloader

# Enabling mod_rewrite in Apache
RUN a2enmod rewrite

# Configure Apache to allow .htaccess
RUN echo "<Directory /var/www/html>" >> /etc/apache2/apache2.conf
RUN echo "    AllowOverride All" >> /etc/apache2/apache2.conf
RUN echo "    Require all granted" >> /etc/apache2/apache2.conf
RUN echo "</Directory>" >> /etc/apache2/apache2.conf

# Create the .htaccess file to redirect all requests to app.php
RUN echo '<IfModule mod_rewrite.c>' > /var/www/html/.htaccess && \
    echo 'RewriteEngine On' >> /var/www/html/.htaccess && \
    echo 'RewriteCond %{REQUEST_FILENAME} !-f' >> /var/www/html/.htaccess && \
    echo 'RewriteCond %{REQUEST_FILENAME} !-d' >> /var/www/html/.htaccess && \
    echo 'RewriteRule . /app.php [L]' >> /var/www/html/.htaccess && \
    echo '</IfModule>' >> /var/www/html/.htaccess

# Expose port 80
EXPOSE 80

# Start command: start Apache in foreground
CMD ["apache2ctl", "-D", "FOREGROUND", "-k", "start", "-C", "ServerName localhost"]

