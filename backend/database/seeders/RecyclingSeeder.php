<?php

namespace Database\Seeders;

use App\Models\Recycling; 
use Illuminate\Database\Seeder;

class RecyclingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Recycling::factory()->count(100000)->create();  // 100.000 rekord generálása
    }
}
