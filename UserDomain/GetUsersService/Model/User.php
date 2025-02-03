<?php
use MongoDB\Client;
use MongoDB\BSON\ObjectId;

class User {
    public static function findByFilter($filter, $db, $authenticatedUserId) {
        try {
            $collection = $db->users;
            return $collection->find([
                '$or' => [
                    ['names' => new MongoDB\BSON\Regex($filter, 'i')],
                    ['surnames' => new MongoDB\BSON\Regex($filter, 'i')]
                ],
                '_id' => ['$ne' => new ObjectId($authenticatedUserId)]
            ])->toArray();
        } catch (Exception $e) {
            error_log("🔴 Error searching for users: " . $e->getMessage());
            return [];
        }
    }
}
?>
