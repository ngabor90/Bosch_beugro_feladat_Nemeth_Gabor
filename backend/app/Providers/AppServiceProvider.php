<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Regisztrálja a szolgáltatásokat.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * A szolgáltatásokat indító logika.
     *
     * @return void
     */
    public function boot()
    {
        // API route-ok regisztrálása
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));
    }
}
