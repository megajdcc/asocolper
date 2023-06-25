<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\{DB};


class CategoriaController extends Controller
{
    

    public function all(){

        $categorias = Categoria::all();

        foreach($categorias as $categoria){

            $categoria->contenidos;

        }

        return response()->json($categorias);

    }


    public function fetchData(Request $request){

        $data = $request->all();

        $pagination = Categoria::where([
            ['nombre','LIKE','%'.$data['q'].'%','OR'],['icono', 'LIKE', '%' . $data['q'] . '%', 'OR'],

        ])
        ->orderBy($data['sortBy'] ?: 'id' , $data['sortDesc'] ? 'desc' : 'asc')
        ->paginate($data['perPage'] ?: 10000);

        $categorias = $pagination->items();

        foreach($categorias as $categoria){
            $categoria->contenidos;
        }


        return [
            'categorias' => $categorias,
            'total' => $pagination->total()
        ];

    }


    private function validar(Request $request,Categoria $categoria = null) : array{

        return $request->validate([
            'nombre' => ['required',$categoria ? Rule::unique('categorias','nombre')->ignore($categoria) : 'unique:categorias,nombre'],
            'icono' => 'nullable'
        ],[
            'nombre.required' => 'El nombre es importante no lo olvides',
            'nombre.unique' => 'El nombre ya está siendo utilizado, inténte con otro'
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
                $categoria = Categoria::create($datos);

                $categoria->contenidos;

            DB::commit();
            $result =true;
            
        }catch(\Exception $e){
            DB::rollBack();
            
            $result =false;
        }

        return response()->json(['result' => $result,'categoria' => $result ? $categoria : null]);
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Categoria $categoria)
    {

        $datos = $this->validar($request,$categoria);


        try {
            DB::beginTransaction();
            $categoria->update($datos);

            $categoria->contenidos;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();

            $result = false;
        }

        return response()->json(['result' => $result, 'categoria' => $result ? $categoria : null]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Categoria  $categoria
     * @return \Illuminate\Http\Response
     */
    public function destroy(Categoria $categoria)
    {
        try{
            DB::beginTransaction();
            $categoria->delete();

            DB::commit();
            $result  = true;
        }catch(\Exception $e){
            DB::rollBack();


            $result = false;
        }

        return response()->json(['result' => $result]);


    }

    public function fetch(Categoria $categoria){

        $categoria->contenidos;

        return response()->json($categoria);
    }
}
