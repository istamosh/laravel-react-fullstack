<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // provide the table fillable fields
    protected $fillable = [
        'title',
        'content',
        'user_id', // this is the foreign key field for user that created the post
        'admin_touched', // this field will be used to track if admin has touched the post
    ];

    // define relationship with user, will be accessed through $post->user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
