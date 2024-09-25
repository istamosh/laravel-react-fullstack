<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // creating new post will fill the user_id entry with the current authenticated user
            // if the user is deleted, all of the user's posts will be deleted as well
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();

            // provide your migration fields here
            $table->string('title');
            $table->text('content');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
