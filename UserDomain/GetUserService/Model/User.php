<?php
class User {
    public static function findById($id, $db) {
        $collection = $db->users;
        return $collection->findOne(['_id' => new MongoDB\BSON\ObjectId($id)]);
    }
}
?>
