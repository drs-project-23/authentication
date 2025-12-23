<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SigninRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class SigninController extends Controller
{
    // validate user credentials
    public function store(SigninRequest $request)
    {
        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            // THIS LINE IS CRITICAL: It links the session to the cookie
            $request->session()->regenerate();

            return response()->json(Auth::user());
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
