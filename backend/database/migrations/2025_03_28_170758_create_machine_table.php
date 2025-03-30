<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
{
    Schema::create('machines', function (Blueprint $table) {
        $table->id();
        $table->string('machine_name')->unique(); 
        $table->string('location');
        $table->dateTime('installation_date');
        $table->timestamps();
    });
}


    public function down()
    {
        Schema::dropIfExists('machines');
    }
};
