<?php
require __DIR__ . '/vendor/autoload.php';

use Slim\Factory\AppFactory;
use MongoDB\Client;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ . '/middlewares/auth.php';

$app = AppFactory::create();

$mongoClient = new Client("mongodb://admin:secret@ec2-18-207-77-6.compute-1.amazonaws.com:27017/userservice?authSource=admin");
$db = $mongoClient->userservice;

require __DIR__ . '/routes/getUsers.php';

$app->run();
?>
