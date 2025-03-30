<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recycling;
use App\Models\Product;

class RecyclingController extends Controller
{
    public function index(Request $request)
    {
        $query = Recycling::query();

        if ($request->has('from') && $request->has('to')) {
            $query->whereBetween('event_date', [$request->input('from'), $request->input('to')]);
        }

        if ($request->has('machine_id')) {
            $query->where('machine_id', $request->input('machine_id'));
        }

        if ($request->has('event_type')) {
            $query->where('event_type', $request->input('event_type'));
        }

        return response()->json($query->get());
    }

    public function getParetoDataSuccess(Request $request)
    {
        // Alapértelmezett szűrési paraméterek
        $from = $request->input('from', '2025-01-01 00:00:00');
        $to = $request->input('to', '2025-04-01 23:59:59');
        $machine = $request->input('machine', null);

        // Lekérjük az összes sikeres recycling eseményt
        $recyclingData = Recycling::with('machine') // Hozzáadjuk a gép adatokat
            ->whereBetween('event_date', [$from, $to])
            ->where('event_type', 'success') // Csak a sikereseket vesszük figyelembe
            ->when($machine, function ($query) use ($machine) {
                return $query->where('machine_id', $machine); // Szűrjük a gép alapján
            })
            ->get();

        // Az adatok összesítése: hány darabot vittek vissza termékenként
        $result = $recyclingData->groupBy('product_id')->map(function ($item) {
            return $item->count();
        });

        return response()->json($result);
    }

    public function getParetoData(Request $request)
    {
        // Alapértelmezett szűrési paraméterek
        $from = $request->input('from', '2025-01-01 00:00:00');
        $to = $request->input('to', '2025-04-01 23:59:59');
        $machine = $request->input('machine', null);

        // Lekérjük az összes eseményt
        $recyclingData = Recycling::with('machine') // Hozzáadjuk a gép adatokat
            ->whereBetween('event_date', [$from, $to])
            ->when($machine, function ($query) use ($machine) {
                return $query->where('machine_id', $machine); // Szűrjük a gép alapján
            })
            ->get();

        // Az adatok csoportosítása product_id és event_type szerint
        $result = $recyclingData->groupBy('product_id')->map(function ($items) {
            return $items->groupBy('event_type')->map(function ($events) {
                return $events->count();
            });
        });

        return response()->json($result);
    }


    public function getParetoDataByProductId(Request $request, $productId)
    {
        // Alapértelmezett szűrési paraméterek
        $from = $request->input('from', '2025-01-01 00:00:00');
        $to = $request->input('to', '2025-04-01 23:59:59');
        $machine = $request->input('machine', null); // Gépre vonatkozó szűrő

        // Lekérjük az összes eseményt a megadott termékhez
        $recyclingData = Recycling::with('machine') // Gépeket is hozzuk be
            ->where('product_id', $productId)
            ->whereBetween('event_date', [$from, $to])
            ->when($machine, function ($query) use ($machine) {
                return $query->where('machine_id', $machine); // Szűrés gépre
            })
            ->get();

        // Az adatok csoportosítása event_type szerint
        $result = $recyclingData->groupBy('event_type')->map(function ($events) {
            return $events->count();
        });

        return response()->json($result);
    }

}
