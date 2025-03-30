<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Machine;

class MachineFactory extends Factory
{
    protected $model = Machine::class;

    public function definition()
    {
        return [
            'machine_name' => $this->faker->company,
            'location' => $this->faker->address,
            'installation_date' => $this->faker->dateTimeBetween('-1 years', 'now'),
        ];
    }
}
