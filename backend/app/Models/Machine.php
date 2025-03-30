<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;

    protected $table = 'machines';

    protected $fillable = [
        'machine_name',
        'location',
        'installation_date',
    ];

    // Kapcsolat a Recycling modellel
    public function recyclings()
    {
        return $this->hasMany(Recycling::class, 'machine_id');
    }
}
