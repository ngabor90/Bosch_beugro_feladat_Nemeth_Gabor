<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RecyclingController;
use App\Http\Controllers\MachineController;

Route::middleware('api')->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'API is working']);
    });

    // User login route
    Route::post('/login', [LoginController::class, 'login']);

    // Product routes
    Route::get('/products', [ProductController::class, 'index']);

    // Recycling  routes
    Route::get('/recycling', [RecyclingController::class, 'index']);
    Route::get('/pareto', [RecyclingController::class, 'getParetoData']);
    Route::get('/pareto/{id}', [RecyclingController::class, 'getParetoDataByProductId']);
    Route::get('/pareto-success', [RecyclingController::class, 'getParetoDataSuccess']); 

    // Machine routes
    Route::get('/machines', [MachineController::class, 'index']);
    Route::get('/machines/{id}', [MachineController::class, 'show']);
});
