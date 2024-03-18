<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->save();

        return response()->json(['message' => 'User successfully registered'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user = Auth::user(); // Obtiene el usuario autenticado
        $token = $user->createToken('PersonalAccessToken')->accessToken;

        // Incluye datos del usuario en la respuesta, ajusta según los datos que necesites enviar
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                // Puedes incluir más campos según sea necesario
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->token()->revoke();
            // Cualquier otra limpieza necesaria aquí
            return response()->json(['message' => 'Successfully logged out']);
        }

        // Maneja el caso donde no hay un usuario autenticado
        return response()->json(['error' => 'No authenticated user'], 401);
    }



}
