<?php
require_once __DIR__ . '/../Model/User.php';

class GetUsersController {
    public function getUsers($request, $response, $args) {
        global $db;

        error_log("Running getUser Controller...");

        // Get authenticated user from middleware
        $authenticatedUser = $request->getAttribute('user');

        if (!$authenticatedUser) {
            error_log("🔴 Authenticated user not found");
            $response->getBody()->write(json_encode(["message" => "NoAccess"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(403);
        }

        error_log("✅ Authenticated user: " . json_encode($authenticatedUser));

        // Get the search filter
        $filter = $args['filter'];

        // Search for users in MongoDB
        $users = User::findByFilter($filter, $db, $authenticatedUser->sub);

        error_log("✅ Users Found: " . json_encode($users));

        $response->getBody()->write(json_encode(["data" => $users]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
}
?>
