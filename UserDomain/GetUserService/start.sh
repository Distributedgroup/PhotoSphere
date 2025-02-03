#!/bin/bash

# Load environment variables from .env manually
set -a
[ -f /var/www/html/.env ] && . /var/www/html/.env
set +a

# Start Apache
apache2-foreground
