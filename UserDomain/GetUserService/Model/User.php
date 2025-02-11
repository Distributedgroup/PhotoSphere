<?php
require_once __DIR__ . '/../app.php';

class User {
    private $collection;

    public function __construct($db) {
        $this->collection = $db->users;
    }

    public function findById($id, $db) {
        try {
            $user = $db->users->findOne(["_id" => new MongoDB\BSON\ObjectId($id)]);

            if (!$user) {
                return null;
            }

            // Convertir datos a un array asociativo compatible con el frontend
            return [
                "names" => $user["names"] ?? "",
                "surnames" => $user["surnames"] ?? "",
                "email" => $user["email"] ?? "",
                "country" => $user["country"] ?? "",
                "profession" => $user["profession"] ?? "",
                "birth" => isset($user["birth"]) ? $user["birth"]->toDateTime()->format('Y-m-d') : "",
                "gender" => $user["gender"] ?? "",
                "phone" => $user["phone"] ?? "",
                "avatar" => $user["avatar"] ?? "defecto.png",
                "frontPage" => $user["frontPage"] ?? "",
                "state" => $user["state"] ?? false,
                "description" => $user["description"] ?? "",
                "username" => $user["username"] ?? "",
                "password" => "", // No exponer la contraseña
                "code_reset" => "", // No exponer el código de reseteo
                "createdAt" => isset($user["createdAt"]) ? $user["createdAt"]->toDateTime()->format('Y-m-d H:i:s') : "",
            ];
        } catch (Exception $e) {
            error_log("Error fetching user by ID: " . $e->getMessage());
            return null;
        }
    }
}
?>
