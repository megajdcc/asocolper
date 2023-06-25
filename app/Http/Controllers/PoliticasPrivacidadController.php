<?php

namespace App\Http\Controllers;

use App\Models\PoliticasPrivacidad;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB};


class PoliticasPrivacidadController extends Controller
{


    public function get(){

        $politicas = PoliticasPrivacidad::first();

        if(!$politicas){
            $politicas = PoliticasPrivacidad::create([
                'politicas' => 'contenido'
            ]);
        }

        return response()->json($politicas);


    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PoliticasPrivacidad  $politicasPrivacidad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PoliticasPrivacidad $politica)
    {
        $data = $request->validate([
            'politicas' => 'required'
        ]);

        try{
            DB::beginTransaction();

            $politica->update($data);


            DB::commit();
            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'politica' => $politica]);
    }


}
