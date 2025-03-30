<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Recycling;
use App\Models\Machine;  // Hozzáadva a gép modell
use Illuminate\Database\Eloquent\Factories\Factory;

class RecyclingFactory extends Factory
{
    protected $model = Recycling::class;

    /**
     * A modell alapértelmezett állapotának meghatározása
     *
     * @return array
     */
    public function definition()
    {
        return [
            'machine_id' => Machine::query()->inRandomOrder()->value('id') ?? Machine::factory()->create()->id, // Véletlenszerű gép ID
            'product_id' => Product::query()->inRandomOrder()->value('id') ?? Product::factory()->create()->id, // Véletlenszerű termék ID
            'event_type' => $this->faker->randomElement(['success', 'error', 'warning']), // Eseménytípus
            'event_date' => $this->faker->dateTimeBetween('2025-01-01 00:00:00', '2025-04-01 23:59:59'), // Esemény dátuma
        ];
    }
}
