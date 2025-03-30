<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        // Az összes üdítő lekérése
        return response()->json(Product::all());
    }
}
