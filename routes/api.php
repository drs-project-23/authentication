<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SigninController;
use App\Http\Controllers\Auth\SignupController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;


Route::post('/signup', [SignupController::class, 'store']);

Route::post('/signin', [SigninController::class, 'store']);
Route::middleware(['web', EnsureFrontendRequestsAreStateful::class,])->group(function () {
    Route::post('/signin', [SigninController::class, 'store']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    /* Signout */
    Route::post('/logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully']);
    });
});
