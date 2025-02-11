<?php

namespace Model;

use Jenssegers\Mongodb\Eloquent\Model;

class User extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'names',
        'surnames',
        'email',
        'country',
        'profession',
        'birth',
        'gender',
        'phone',
        'avatar',
        'frontPage',
        'state',
        'description',
        'username',
        'password',
        'code_reset',
    ];

    protected $attributes = [
        'avatar' => 'defecto.png',
        'state' => false,
    ];

    protected $dates = ['birth', 'created_at', 'updated_at'];

    public $timestamps = true;
}
