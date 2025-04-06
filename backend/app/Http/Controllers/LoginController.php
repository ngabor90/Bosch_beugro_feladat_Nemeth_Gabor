<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Teszt felhasználó
            //'email' => 'testuser@example.com',
            //'password' => 'password123'

        // Validáció (csak hogy biztosan legyen email és password)
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Megpróbáljuk lekérni a felhasználót
        $user = \App\Models\User::where('email', $request->email)->first();

        // Ha nincs ilyen email vagy nem jó a jelszó
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Ha minden oké, létrehozunk egy token-t (Sanctum)
        $token = $user->createToken('frontend')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }
}
