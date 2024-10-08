<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * @return void
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
        ]);

        // seed a default user
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@doe',
            'password' => Hash::make('password!'),
        ]);

        // seed a total of 50 users
        $users = User::factory()->count(50)->create();
    
        // seed a total of 100 posts
        Post::factory()->count(100)->create([
            'user_id' => function() use ($users) { 
                return $users->random()->id;
            },
        ]);
    }
}
