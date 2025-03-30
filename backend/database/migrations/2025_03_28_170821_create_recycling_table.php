<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('recycling', function (Blueprint $table) {
        $table->id();
        $table->foreignId('machine_id')->nullable()->constrained('machines')->onDelete('cascade'); // Gép ID kapcsolata
        $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Termék ID kapcsolata
        $table->enum('event_type', ['success', 'error', 'warning']);
        $table->dateTime('event_date');
        $table->timestamps();
    });
    
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recycling');
    }
};
