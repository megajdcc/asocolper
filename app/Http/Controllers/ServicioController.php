<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\{DB,Storage,File};

use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class ServicioController extends Controller
{
    
    public function fetchData(Request $request){

        $datos = $request->all();

        $pagination = Servicio::where([
            ['titulo','LIKE',"%{$datos['q']}%",'OR'],
            ['subtitulo','LIKE',"%{$datos['q']}%",'OR'],
            ['contenido', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['url', 'LIKE', "%{$datos['q']}%", 'OR'],
            ['breve', 'LIKE', "%{$datos['q']}%", 'OR'],

        ])
        ->whereHas('categoria',function(Builder $q) use($datos){
            $q->orWhere([
                ['nombre','LIKE',"%{$datos['q']}%",'OR']
            ]);
        })
        ->where('categoria_id',isset($datos['categoria_id']) ? $datos['categoria_id']:'>',0)
        ->orderBy($datos['sortBy'] ?: 'id', $datos['sortDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);



        $servicios = $pagination->items();


        foreach($servicios as $servicio){
            $servicio->usuario;
            $servicio->usuario->avatar = $servicio->usuario->getAvatar();
            $servicio->servicio;
            $servicio->categoria;
            $servicio->subServicios;
        }

        return response()->json([
            'total' => $pagination->total(),
            'servicios' => $servicios
        ]);


    }


    private function validar(Request $request,Servicio $servicio = null) :array{

        return $request->validate([
            'titulo'      => 'required',
            'subtitulo'   => 'nullable',
            'breve'       => 'nullable',
            'url'         => ['required',$servicio ? Rule::unique('servicios','url')->ignore($servicio): 'unique:servicios,url'],
            'contenido'   => 'required',
            'usuario_id'  => 'nullable',
            'servicio_id' => 'nullable',
            'categoria_id' => 'required'
        ],[
            'url.unique' => 'La url del servicio debe ser única, ya está siendo usada...',
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

            $servicio = Servicio::create([...$datos,...[
                'url' => Str::slug($datos['url']),
                'usuario_id' => $request->user()->id
            ]]);

            DB::commit();
            $result =true;

            $servicio->usuario;
            $servicio->subServicios;
            $servicio->categoria;
            $servicio->usuario->avatar = $servicio->usuario->getAvatar();


        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        return response()->json([
            'result' => $result,
            'servicio' => $result ? $servicio : null
        ]);

    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Servicio  $servicio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Servicio $servicio)
    {

        $datos = $this->validar($request,$servicio);

        try {
            DB::beginTransaction();

            $servicio->update([...$datos, ...[
                'url' => Str::slug($datos['url']),
                'banner' => $servicio->banner,
            ]]);

            DB::commit();
            $result = true;

            $servicio->usuario;
            $servicio->subServicios;
            $servicio->categoria;
            $servicio->usuario->avatar = $servicio->usuario->getAvatar();

        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json([
            'result' => $result,
            'servicio' => $result ? $servicio : null
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Servicio  $servicio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Servicio $servicio)
    {
        try{
            DB::beginTransaction();
            $servicio->delete();
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function fetch(Servicio $servicio){
        $servicio->usuario;
        $servicio->usuario->avatar = $servicio->usuario->getAvatar();

        $servicio->subServicios;
        $servicio->categoria;

        return response()->json($servicio);


    }

    public function getAll(){

        $servicios = Servicio::all();


        foreach ($servicios as $key => $servicio) {
            $servicio->usuario;
            $servicio->usuario->avatar = $servicio->usuario->getAvatar();

            $servicio->subServicios;
            $servicio->categoria;
        }


        return response()->json($servicios);
    }

    public function addBanner(Request $request, Servicio $servicio){


        $banner = $request->file('banner');

        try{
            DB::beginTransaction();

            if($servicio->banner){
                Storage::disk('banner-servicio')->delete($servicio->banner);
            }

            $banner_name = \sha1($banner->getClientOriginalName()).'.'.$banner->getClientOriginalExtension();

            Storage::disk('banner-servicio')->put($banner_name,File::get($banner));

            $servicio->banner = $banner_name;
            $servicio->save();


            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

            dd($e->getMessage());
        }
        $servicio->usuario;
        $servicio->usuario->avatar = $servicio->usuario->getAvatar();

        $servicio->servicio;
        $servicio->categoria;
        $servicio->subServicios;

        return response()->json(['result' => $result,'servicio' => $servicio]);

    }

    public function fetchPorUrl($url){

        $servicio = Servicio::where('url',$url)->first();

        $servicio->usuario;
        $servicio->usuario->avatar = $servicio->usuario->getAvatar();

        $servicio->servicio;
        $servicio->categoria;
        $servicio->subServicios;

        return response()->json($servicio);
    }


    public function getRandown(){

        $servicios = Servicio::limit(3)->get();


        foreach ($servicios as $key => $servicio) {
            $servicio->usuario;
            $servicio->usuario->avatar = $servicio->usuario->getAvatar();

            $servicio->servicio;
            $servicio->categoria;
            $servicio->subServicios;
        }

        return response()->json($servicios);
    }




}
