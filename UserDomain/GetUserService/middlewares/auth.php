<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

// Directly defines the secret key of the JWT
$JWT_SECRET = "6M5X#D6%7Nh*!pkR3HL7F@Fdx";

function authMiddleware(Request $request, RequestHandler $handler): Response {
    global $JWT_SECRET; // Ensures that the variable is accessible

    error_log("Authentication middleware running...");

    $headers = $request->getHeader('Authorization');

    if (!$headers || count($headers) === 0) {
        error_log("🔴 No Authorization header found");
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(["message" => "NoAccess"]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
    }

    // Extract the token successfully
    $token = str_replace("Bearer ", "", $headers[0]);

    // Log the received token in the logs
    error_log("🟡 Token recibido: " . $token);

    try {
        // Decrypt the token with the secret key
        $decoded = JWT::decode($token, new Key($JWT_SECRET, 'HS256'));

        // If valid, print the token information
        error_log("✅ Valid token: " . json_encode($decoded));

        // Add the user to the request
        $request = $request->withAttribute('user', $decoded);

        // Pass the request to the next middleware/controller
        return $handler->handle($request);

    } catch (Exception $e) {
        error_log("🔴 Invalid token: " . $e->getMessage());
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(["message" => "Invalid Token", "error" => $e->getMessage()]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
    }
}
?>
