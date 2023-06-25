<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Models\User;
use App\Models\Sistema;


Route::get('/usuario/{usuario}/establecer/contrasena', function (User $usuario) {
   $sistema = Sistema::first();
   $sistema->sucursales;
   $sistema->redes;
   $sistema->usuario;
   $sistema->metas;

   foreach ($sistema->sucursales as $sucursal) {
      $sucursal->sistema;
      $sucursal->estado->pais;
      $sucursal->ciudad;
   }

   if ($usuario->is_password) {
      return redirect('/login');
   } else {
      return view('application', ['usuario' => $usuario,'sistema' => $sistema]);
   }


});


Route::get('/reset-password/{token}', function ($token) {

   $sistema = Sistema::first();
   $sistema->sucursales;
   $sistema->redes;
   $sistema->usuario;
   $sistema->metas;

   foreach ($sistema->sucursales as $sucursal) {
      $sucursal->sistema;
      $sucursal->estado->pais;
      $sucursal->ciudad;
   }


   return view('application',
      ['token' => $token,'sistema' => $sistema]
   );
})->middleware('guest')->name('password.reset');

// Route::get('/', [ApplicationController::class, 'index']);
// Route::get('/contacto', [ApplicationController::class, 'index']);
// Route::get('/quienes-somos', [ApplicationController::class, 'index']);
// Route::get('/nuestros-socios', [ApplicationController::class, 'index']);
// Route::get('/servicios', [ApplicationController::class, 'index']);
// Route::get('/blog', [ApplicationController::class, 'index']);
// Route::get('/login', [ApplicationController::class, 'index']);
// Route::get('/forgot-password', [ApplicationController::class, 'index']);




Route::get('/{any}', [ApplicationController::class, 'index'])->where('any', '.*');


