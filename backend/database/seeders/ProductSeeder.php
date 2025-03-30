<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        static $products = [
            'Coca-Cola',
            'Pepsi',
            'Sprite',
            'Fanta',
            'Schweppes',
            '7Up',
            'Mirinda',
            'Mountain Dew',
            'Lipton Ice Tea',
            'Nestea'
        ];

        foreach ($products as $productName) {
            Product::create([
                'type_number' => 'P' . rand(1000000, 9999999),
                'product_name' => $productName
            ]);
        }
    }
}
