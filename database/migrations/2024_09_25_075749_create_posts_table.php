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

            // provide your migration fields here
            $table->string('title');
            $table->text('content');

            // FK to users table, when user is deleted, delete the post as well
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();

            // provide admin_touched field to track if admin has touched the post
            $table->boolean('admin_touched')->default(false);

            $table->timestamps();
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
