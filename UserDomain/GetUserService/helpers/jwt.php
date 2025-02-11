<?php
use Firebase\JWT\JWT;

class JWTHandler {
    public static function createToken($user) {
        $payload = [
            "sub" => $user["_id"],
            "names" => $user["names"],
            "surnames" => $user["surnames"],
            "email" => $user["email"],
            "iat" => time(),
            "exp" => time() + (30 * 24 * 60 * 60) // 30 days
        ];

        return JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');
    }
}
?>
