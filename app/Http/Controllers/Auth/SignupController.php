<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    // custom new store request for sign up validation
    public function store(SignupRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->form["name"],
            'username' => $request->form["username"],
            'email' => $request->form["email"],
            'password' => Hash::make($request->form["password"])
        ]);

        return response()->json([
            "success" => true,
            'message' => 'User registered successfully',
        ], 201);
    }
}
