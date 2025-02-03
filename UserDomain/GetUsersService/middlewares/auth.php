<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

$JWT_SECRET = "6M5X#D6%7Nh*!pkR3HL7F@Fdx";

function authMiddleware(Request $request, RequestHandler $handler): Response {
    global $JWT_SECRET;

    error_log("Authentication middleware running...");

    $headers = $request->getHeader('Authorization');

    if (!$headers || count($headers) === 0) {
        error_log("🔴 No Authorization header found");
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(["message" => "NoAccess"]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
    }

    $token = str_replace("Bearer ", "", $headers[0]);

    error_log("🟡 Token received: " . $token);

    try {
        $decoded = JWT::decode($token, new Key($JWT_SECRET, 'HS256'));
        error_log("✅ Valid token: " . json_encode($decoded));
        $request = $request->withAttribute('user', $decoded);
        return $handler->handle($request);
    } catch (Exception $e) {
        error_log("🔴 Invalid Token: " . $e->getMessage());
        $response = new \Slim\Psr7\Response();
        $response->getBody()->write(json_encode(["message" => "Invalid Token", "error" => $e->getMessage()]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
    }
}
?>
