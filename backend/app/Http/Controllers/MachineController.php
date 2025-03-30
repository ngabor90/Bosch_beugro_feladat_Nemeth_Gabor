<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Machine;

class MachineController extends Controller
{
    public function index()
    {
        return response()->json(Machine::all());
    }

    public function show($id)
    {
        $machine = Machine::find($id);
        if (!$machine) {
            return response()->json(['message' => 'Machine not found'], 404);
        }
        return response()->json($machine);
    }
}
