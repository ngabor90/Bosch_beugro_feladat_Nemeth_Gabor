<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Teszt felhasználó
        $credentials = [
            'email' => 'testuser@example.com',
            'password' => 'password123'
        ];

        // Bejelentkezés ellenőrzése
        if ($request->isMethod('post')) { 
            if ($request->email === $credentials['email'] && $request->password === $credentials['password']) {
                return response()->json(['message' => 'Login successful']);
            }

            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(['message' => 'Invalid request method'], 405); // Ha nem POST, akkor "Method Not Allowed"
    }
}
