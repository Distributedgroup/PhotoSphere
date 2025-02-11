<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'users';

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

    protected $hidden = [
        'password',
        'code_reset',
    ];

    protected $casts = [
        'birth' => 'date',
        'state' => 'boolean',
        'created_at' => 'datetime',
    ];
}
