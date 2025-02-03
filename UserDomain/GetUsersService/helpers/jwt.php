<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTAuth {
    private static $secret = "6M5X#D6%7Nh*!pkR3HL7F@Fdx";

    public static function createToken($user) {
        $payload = [
            "sub" => $user['_id'],
            "names" => $user['names'],
            "surnames" => $user['surnames'],
            "email" => $user['email'],
            "iat" => time(),
            "exp" => time() + (30 * 24 * 60 * 60) // 30 días
        ];

        return JWT::encode($payload, self::$secret, 'HS256');
    }
}
?>
