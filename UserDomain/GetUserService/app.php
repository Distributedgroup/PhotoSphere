<?php
require __DIR__ . '/vendor/autoload.php';

use Slim\Factory\AppFactory;
use MongoDB\Client;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
require_once __DIR__ . '/Controller/getUserController.php';

// Define the connection to MongoDB directly in the code
$MONGO_URI = "mongodb://admin:secret@ec2-18-207-77-6.compute-1.amazonaws.com:27017/userservice?authSource=admin";
$JWT_SECRET = "6M5X#D6%7Nh*!pkR3HL7F@Fdx"; // Define JWT directly in the code

// Create Slim instance
$app = AppFactory::create();

// Trying to connect to MongoDB
try {
    $mongoClient = new Client($MONGO_URI);
    $db = $mongoClient->userservice;
    error_log("✅ Connection to MongoDB successful");
} catch (Exception $e) {
    error_log("❌ Error connecting to MongoDB: " . $e->getMessage());
    die(json_encode(["error" => "MongoDB connection failed", "details" => $e->getMessage()]));
}

// Middleware
require __DIR__ . '/middlewares/auth.php';

// Test route to verify connection to MongoDB
$app->get('/api/test_mongo', function (Request $request, Response $response, array $args) {
    global $db;
    try {
        $collections = $db->listCollections();
        $collectionNames = [];
        foreach ($collections as $collection) {
            $collectionNames[] = $collection->getName();
        }
        $response->getBody()->write(json_encode(["message" => "MongoDB Connected", "collections" => $collectionNames]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    } catch (Exception $e) {
        $response->getBody()->write(json_encode(["error" => "MongoDB connection failed", "details" => $e->getMessage()]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
    }
});


$app->get('/api/get_user/{id}', function (Request $request, Response $response, array $args) {
    $controller = new GetUserController();
    return $controller->getUser($request, $response, $args);
})->add('authMiddleware'); // Apply middleware here


// Run the application
$app->run();
?>
