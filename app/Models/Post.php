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
        'user_id',
    ];

    // define relationship with user, will be accessed through $post->user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
