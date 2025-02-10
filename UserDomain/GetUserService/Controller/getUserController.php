<?php
require_once __DIR__ . '/../Model/User.php';

class GetUserController {
    public function getUser($request, $response, $args) {
        global $db;

        error_log("🔹 Running getUserController...");

        // Get the authenticated user from the middleware
        $authenticatedUser = $request->getAttribute('user')

        if (!$authenticatedUser) {
            error_log("🔴 Authenticated user not found");
            $response->getBody()->write(json_encode(["message" => "NoAccess"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
        }

        error_log("✅ Authenticated user: " . json_encode($authenticatedUser));

        // Get the ID from the parameters
        $id = $args['id'];

        // Validate ID format
        if (!preg_match('/^[0-9a-fA-F]{24}$/', $id)) {
            error_log("🔴 Invalid ID format: " . $id);
            $response->getBody()->write(json_encode(["message" => "Invalid ID format"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        // Search for user in MongoDB
        $user = User::findById($id, $db);

        if (!$user) {
            error_log("🔴 User not found: " . $id);
            $response->getBody()->write(json_encode(["message" => "User not found"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
        }

        error_log("✅ User Found: " . json_encode($user));

        // Reply with user data
        $response->getBody()->write(json_encode(["data" => $user]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
?>
