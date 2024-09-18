<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        // insert annotation
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // createToken is available after install Sanctum and
        // and configuring User model and adding HasApiTokens trait
        $token = $user->createToken('authToken')->plainTextToken;

        return response(compact('user', 'token'));
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided credentials are not correct.',
            ]);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $accessToken = $user->currentAccessToken();
        if ($accessToken) {
            $user->deleteToken($accessToken);
        }
        return response('', 204);
    }
}
