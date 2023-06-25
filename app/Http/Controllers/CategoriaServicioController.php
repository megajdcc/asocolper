<?php

namespace App\Http\Controllers;

use App\Models\CategoriaServicio;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB};
use Illuminate\Validation\Rule;


class CategoriaServicioController extends Controller
{
   
    public function getAll(){
        $categorias = CategoriaServicio::all();

        foreach ($categorias as $key => $categoria) {
            $categoria->servicios;
        }

        return response()->json($categorias);
    }

    public function fetchData(Request $request){

        $datos = $request->all();

        $pagination = CategoriaServicio::where([
            ['nombre','LIKE','%'.$datos['q'].'%','OR'],['breve', 'LIKE', '%' . $datos['q'] . '%', 'OR'],   
        ])
        ->orderBy($datos['sortBy'] ?: 'id' , $datos['sortDesc'] ? 'desc' : 'asc')
        ->paginate($datos['perPage'] === 0 ? 10000 : $datos['perPage']);


        $categorias = $pagination->items();


        foreach ($categorias as $key => $categoria) {
            $categoria->servicios;
        }

        return response()->json([
            'total' => $pagination->total(),
            'categorias' => $categorias,
        ]);



    }


    public function validar(Request $request, CategoriaServicio $categoriaServicio = null) :array{

        return $request->validate([
            'nombre' => ['required',$categoriaServicio ? Rule::unique('categoria_servicios','nombre')->ignore($categoriaServicio) : 'unique:categoria_servicios,nombre'],
            'breve' => 'nullable'
        ],[
            'nombre.unique' => 'El nombre de la categoría ya está creado con éxito'
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
            $categoria = CategoriaServicio::create($datos);

            $categoria->servicios;

            DB::commit();
            $result = true;

        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'categoria' => $result ? $categoria : null]);


    }

   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CategoriaServicio  $categoriaServicio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CategoriaServicio $categoria_servicio)
    {
        $datos = $this->validar($request, $categoria_servicio);

        try {
            DB::beginTransaction();
            $categoria_servicio->update($datos);


            $categoria_servicio->servicios;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'categoria' => $result ? $categoria_servicio : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CategoriaServicio  $categoriaServicio
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoriaServicio $categoria_servicio)
    {
        try{
            DB::beginTransaction();

            $categoria_servicio->delete();
            DB::commit();

            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        return response()->json(['result' => $result]);


    }


    public function fetch(CategoriaServicio $categoria){

        $categoria->servicios;

        return response()->json($categoria);

    }
}
