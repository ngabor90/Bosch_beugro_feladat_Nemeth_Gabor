<?php

namespace Database\Factories;

use App\Models\Product;  // Ügyelj arra, hogy itt a megfelelő namespace legyen
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
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

        $product = array_shift($products); 

        return [
            'type_number' => $this->faker->unique()->numerify('P#######'),
            'product_name' => $product,
        ];
    }
}
