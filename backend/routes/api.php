<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecyclingController;
use App\Http\Controllers\MachineController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Http\Request;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;



Route::middleware([EnsureFrontendRequestsAreStateful::class])->group(function () {
    Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'API is working']);
    });

    // User login route
    Route::post('/login', [LoginController::class, 'login']);

    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/recycling', [RecyclingController::class, 'index']);
    Route::get('/pareto', [RecyclingController::class, 'getParetoData']);
    Route::get('/pareto/{id}', [RecyclingController::class, 'getParetoDataByProductId']);
    Route::get('/pareto-success', [RecyclingController::class, 'getParetoDataSuccess']); 
    Route::get('/machines', [MachineController::class, 'index']);
    Route::get('/machines/{id}', [MachineController::class, 'show']);
});
