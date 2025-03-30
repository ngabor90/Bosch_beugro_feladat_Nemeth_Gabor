<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\LoginController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/{any}', function () {
    return File::get(public_path('index.html')); // A frontend belépési pontja
})->where('any', '^(?!api).*$'); // Minden URL-t a frontend kezel, kivéve az api/*-tx0