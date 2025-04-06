<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Dummy felhasználó létrehozása
        $user = new User;
        $user->name = 'Test User';
        $user->email = 'testuser@example.com';
        $user->password = Hash::make('password123'); // A jelszót le kell hash-elni
        $user->save();
    }
}
