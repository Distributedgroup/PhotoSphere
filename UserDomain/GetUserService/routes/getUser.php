<?php
use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

require_once __DIR__ . '/../Controller/getUserController.php';

return function (App $app) {
    $app->get('/api/get_user/{id}', function (Request $request, Response $response, array $args) {
        $controller = new GetUserController();
        return $controller->getUser($request, $response, $args);
    });
};
?>
