<?php
use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ . '/../Controller/getUsersController.php';

$app->get('/api/get_users/{filter}', function (Request $request, Response $response, array $args) {
    $controller = new GetUsersController();
    return $controller->getUsers($request, $response, $args);
})->add('authMiddleware');
?>
