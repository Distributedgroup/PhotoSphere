<?php
class User {
    public static function findById($id, $db) {
        $collection = $db->users;
        return $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);

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
    }
}
?>
    
