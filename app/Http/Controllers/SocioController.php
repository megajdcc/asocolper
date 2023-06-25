<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB,Storage,File};

class SocioController extends Controller
{
    
    public function getSocios(){
        
        $socios = Socio::all();

        foreach ($socios as $key => $socio) {
            $socio->avatar = $socio->getAvatar();
        }

        return response()->json($socios);

    }

    public function fetchData(Request $request){
        $datos  = $request->all();

        $pagination = Socio::where([
            ['nombre','LIKE',"%{$datos['q']}%",'OR'],
            ['apellido','LIKE',"%{$datos['q']}%", 'OR'],
            ['correo', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['telefono', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['perfil', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
        ->orderBy($datos['sortBy'] ?: 'id' , $datos['sortDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);


        $socios = $pagination->items();

        foreach ($socios as $key => $socio) {
            $socio->avatar = $socio->getAvatar();
        }

        return response()->json([
            'socios' => $socios,
            'total' =>$pagination->total(),
        ]);

    }



    private function validar(Request $request,Socio $socio = null) : array{
        return $request->validate([
            'id' => 'nullable',
            'nombre'   => 'required',
            'apellido' => 'nullable',
            'correo'   => 'required',
            'telefono' => 'nullable',
            'perfil'   => 'required',
            'imagen' => 'required_without:id'
        ]);


    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datos = $this->validar($request);

        try{
            DB::beginTransaction();

            $imagen_name = null;

            if($datos['imagen'] && $datos['imagen'] != 'null'){
                $imagen = $request->file('imagen');
                
                $imagen_name  = \sha1($imagen->getClientOriginalName()).'.'.$imagen->getClientOriginalExtension();

                Storage::disk('socios')->put($imagen_name,File::get($imagen));

            }


            $socio = Socio::create([...$datos,...[
                'imagen' => $imagen_name ?: null,
            ]]);


            $socio->avatar = $socio->getAvatar();

            DB::commit();
            $result =true;


        }catch(\Exception $e){
            
            DB::rollBack();
            
            dd($e->getMessage());

            $result = false;
        }

        return response()->json(['result' => $result,'socio' => $result ? $socio : null]);
    }


    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Socio  $socio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Socio $socio)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $imagen_name = $socio->imagen;

            if ($datos['imagen'] && $datos['imagen'] != 'null') {
                
                if($socio->imagen){
                    Storage::disk('socios')->delete($socio->imagen);
                }
               

                $imagen = $request->file('imagen');

                $imagen_name  = \sha1($imagen->getClientOriginalName()) . '.' . $imagen->getClientOriginalExtension();

                Storage::disk('socios')->put($imagen_name, File::get($imagen));
            }


            $socio->update([...$datos, ...[
                'imagen' => $imagen_name ?: null,
            ]]);


            $socio->avatar = $socio->getAvatar();

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'socio' => $result ? $socio : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Socio  $socio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Socio $socio)
    {
        try{
            DB::beginTransaction();
            
            Storage::disk('socios')->delete($socio->imagen);

            $socio->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function fetch(Socio $socio){

        $socio->avatar = $socio->getAvatar();

        return response()->json($socio);
    }

}
