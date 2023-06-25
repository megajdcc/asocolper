<?php

namespace App\Http\Controllers;

use App\Models\Sistema;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB,Storage,File};


class SistemaController extends Controller
{


    public function get(){

        $sistema = Sistema::first();
        
        $sistema->sucursales;
        $sistema->redes;
        foreach($sistema->sucursales as $sucursal){
            $sucursal->sistema;
            $sucursal->estado->pais;
            $sucursal->ciudad;
        }

        $sistema->usuario;

        return response()->json($sistema);
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

   

    private function validar(Request $request,Sistema $sistema) : array{

        return $request->validate([
            'id' => 'required',
            'nombre'      => 'required',
            'lema'        => 'nullable',
            'descripcion' => 'nullable',
            'usuario_id'  => 'nullable',
            // 'logo'        => 'required_without:id',
            // 'logoblack'   => 'nullable',
            // 'favicon'     => 'nullable',
            'redes' => 'nullable',
            'metas' => 'nullable',
            'head' => 'nullable',
            'body' => 'nullable',
            'correos' => 'nullable',
            'quienes_somos' => 'nullable'

        ]);

    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sistema  $sistema
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sistema $sistema)
    {
        $datos = $this->validar($request,$sistema);

        try{
            DB::beginTransaction();
            
            // if($datos && $datos['logo'] != 'null'){

            //     if($sistema->logo){
            //         Storage::disk('logotipos')->delete($sistema->logo);
            //     }

            //     $logo = $request->file('logo');

            //     $logo_name = \sha1($logo->getClientOriginalName()).'.'.$logo->getClientOriginalExtension();

            //     Storage::disk('logotipos')->put($logo_name,File::get($logo));

            // }


            // if ($datos && $datos['logoblack'] != 'null') {

            //     if ($sistema->logoblack) {
            //         Storage::disk('logotipos')->delete($sistema->logoblack);
            //     }

            //     $logoblack = $request->file('logoblack');

            //     $logoblack_name = \sha1($logoblack->getClientOriginalName()) . '.' . $logoblack->getClientOriginalExtension();

            //     Storage::disk('logotipos')->put($logoblack_name, File::get($logoblack));
            // }


            // if ($datos && $datos['favicon'] != 'null') {

            //     if ($sistema->favicon) {
            //         Storage::disk('logotipos')->delete($sistema->favicon);
            //     }

            //     $favicon = $request->file('favicon');

            //     $favicon_name = \sha1($favicon->getClientOriginalName()) . '.' . $favicon->getClientOriginalExtension();

            //     Storage::disk('logotipos')->put($favicon_name, File::get($favicon));
            // }

            $sistema->update($datos);

            DB::commit();
            $result = true;


        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }


        $sistema->sucursales;
        $sistema->redes;
        foreach ($sistema->sucursales as $sucursal) {
            $sucursal->sistema;
            $sucursal->estado->pais;
            $sucursal->ciudad;
        }
        $sistema->usuario;

        

        return response()->json(['result' => $result, 'sistema' => $sistema]);
    }

    public function updateLogo(Request $request, Sistema $sistema){

        try{
            DB::beginTransaction();

            if($sistema->logo){
                Storage::disk('logotipos')->delete($sistema->logo);
            }

            $logo = $request->file('logo');


            $logo_name = \sha1($logo->getClientOriginalName()).'.'.$logo->getClientOriginalExtension();

            Storage::disk('logotipos')->put($logo_name,File::get($logo));

            $sistema->logo = $logo_name;
            $sistema->save();


            DB::commit();
            $result =true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        $sistema->sucursales;
        $sistema->redes;
        foreach ($sistema->sucursales as $sucursal) {
            $sucursal->sistema;
            $sucursal->estado->pais;
            $sucursal->ciudad;
        }
        $sistema->usuario;
        

        return response()->json(['result' => $result, 'sistema' => $sistema]);
    }

    public function updateLogoBlack(Request $request, Sistema $sistema)
    {

        try {
            DB::beginTransaction();

            if ($sistema->logoblack) {
                Storage::disk('logotipos')->delete($sistema->logoblack);
            }

            $logo = $request->file('logoblack');


            $logo_name = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();

            Storage::disk('logotipos')->put($logo_name, File::get($logo));

            $sistema->logoblack = $logo_name;
            $sistema->save();


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        $sistema->sucursales;
        $sistema->redes;
        foreach ($sistema->sucursales as $sucursal) {
            $sucursal->sistema;
            $sucursal->estado->pais;
            $sucursal->ciudad;
        }
        $sistema->usuario;


        return response()->json(['result' => $result, 'sistema' => $sistema]);
    }


    public function updateFavicon(Request $request, Sistema $sistema)
    {

        try {
            DB::beginTransaction();

            if ($sistema->favicon) {
                Storage::disk('logotipos')->delete($sistema->favicon);
            }

            $logo = $request->file('favicon');


            $logo_name = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();

            Storage::disk('logotipos')->put($logo_name, File::get($logo));

            $sistema->favicon = $logo_name;
            $sistema->save();


            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        $sistema->sucursales;
        $sistema->redes;
        foreach ($sistema->sucursales as $sucursal) {
            $sucursal->sistema;
            $sucursal->estado->pais;
            $sucursal->ciudad;
        }
        $sistema->usuario;


        return response()->json(['result' => $result, 'sistema' => $sistema]);
    }


}
