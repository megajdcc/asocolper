<?php

namespace App\Http\Controllers;

use App\Models\{Comentario,Contenido};
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB};
use Illuminate\Database\Eloquent\Builder;


class ComentarioController extends Controller
{
    
    public function fetchData(Request $request){

        $datos = $request->all();

        $pagination = Comentario::where([
            ['comentario','LIKE','%'.$datos['q'].'%','OR'],
            ['nombre', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
            ['email', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
            ['telefono', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
        ])
        ->whereHas('usuario',function(Builder $query) use($datos){
            $query->orWhere([
                ['nombre','LIKE','%'.$datos['q'].'%','OR'],
                ['apellido', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
                ['email', 'LIKE', '%' . $datos['q'] . '%', 'OR'],
            ]);

        })
        ->whereHas('contenido',fn(Builder $q) => $q->where('slug',$datos['slug']))
        ->whereNull('comentario_id')
        ->orderBy($datos['sortBy'] ?: 'id',$datos['sortDesc'] ? 'desc':'asc')
        ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);

        $comentarios = $pagination->items();

        foreach($comentarios as $comentario){
            
            if($comentario->usuario){
                $comentario->usuario->avatar = $comentario?->usuario?->getAvatar(); 
            }

            $comentario->contenido;
            $comentario->comentario;
            foreach ($comentario->comentarios as $comment) {
                $comment->usuario = $comment->usuario;
                $comment->usuario->avatar = $comment?->usuario?->getAvatar();
                $comment->contenido;
                $comment->comentario;
            }

        }

        return response()->json([
            'comentarios' => $comentarios,
            'total' => $pagination->total()
        ]);



    }
    


    private function validar(Request $request,Comentario $comentario = null) : array{
        return $request->validate([
            'comentario'    => 'required',
            'usuario_id'    => 'nullable',
            'nombre'        => 'required',
            'email'         => 'required',
            'telefono'      => 'nullable',
            'comentario_id' => 'nullable',
            'contenido_id'  => 'required'
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
        try{
            DB::beginTransaction();
            $datos = $this->validar($request);

            $comentario = Comentario::create($datos);
           

            DB::commit();
            $result = true;

            if($comentario->usuario){
                $comentario->usuario->avatar = $comentario?->usuario?->getAvatar();
            }

            $comentario->contenido;
            $comentario->comentario;
            $comentario->comentarios;

        }catch(\Exception $e){

            dd($e->getMessage());
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result,'comentario' => $result ? $comentario : null]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comentario $comentario)
    {
        try {
            DB::beginTransaction();
            $datos = $this->validar($request);

            $comentario->update($datos);

            DB::commit();
            $result = true;

            $comentario->usuario = $comentario->usuario;
            $comentario->usuario->avatar = $comentario?->usuario?->getAvatar();

            $comentario->contenido;
            $comentario->comentario;

             $comentario->comentarios;
            foreach ($comentario->comentarios as $comment) {
                $comment->usuario = $comment->usuario;
                $comment->usuario->avatar = $comment?->usuario?->getAvatar();

                $comment->contenido;
                $comment->comentario;
            }


        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'comentario' => $result ? $comentario : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comentario  $comentario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comentario $comentario)
    {
        try{
            DB::beginTransaction();

            $comentario->delete();

            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);


    }

    public function fetch(Comentario $comentario){

        $comentario->usuario = $comentario->usuario;
        $comentario->usuario->avatar = $comentario?->usuario?->getAvatar();

        $comentario->contenido;
        $comentario->comentario;

        return response()->json($comentario);
    }


}
