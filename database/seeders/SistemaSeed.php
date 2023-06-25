<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Sistema;

class SistemaSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sistema::create([
            'nombre' => 'Villamizar & Jarava | Abogados Asociados S.A.S',
            'quienes_somos' => 'villamizar'
        ]);

    }
}
