<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recycling extends Model
{
    use HasFactory;

    protected $table = 'recycling';

    protected $fillable = [
        'machine',
        'product_id',
        'event_type',
        'event_date',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function machine()
    {
        return $this->belongsTo(Machine::class, 'machine_id');
    }
}
