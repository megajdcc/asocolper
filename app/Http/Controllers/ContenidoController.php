<?php

namespace App\Http\Controllers;

use App\Models\Contenido;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{Storage,File,DB};

use Illuminate\Validation\Rule;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use App\Models\User;

class ContenidoController extends Controller
{
   


    public function fetchData(Request $request){

        $data = $request->all();

        $pagination = Contenido::where([
            ['titulo','like','%'.$data['q'].'%','OR'],
            ['slug', 'like', '%' . $data['q'] . '%', 'OR'],
            ['contenido', 'like', '%' . $data['q'] . '%', 'OR'],
        ])
        ->whereHas('usuario',function(Builder $q) use($data){
            $q->orWhere([
                ['nombre','like','%'.$data['q'].'%','OR'],
                ['apellido', 'like', '%' . $data['q'] . '%', 'OR'],
                ['email', 'like', '%' . $data['q'] . '%', 'OR'],
            ]);
        })
        ->orderBy($data['sortBy'] ?:'id', $data['sortDesc'] ? 'desc' : 'asc')
        ->paginate($data['perPage'] == 0 ? 10000 : $data['perPage']);


        $contenidos = $pagination->items();

        foreach($contenidos as $contenido){
            if ($contenido->usuario) {
                $contenido->usuario->avatar = $contenido->usuario->getAvatar();
            }
            $contenido->comentarios;
            $contenido->likes;
            $contenido->categorias;
            foreach ($contenido->comentarios as $comentario) {
                if ($comentario->usuario) {
                    $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
                }
            }
        }


        return response()->json([
            'contenidos' => $contenidos,
            'total' => $pagination->total(),
        ]);




    }

    public function fetchDataPublic(Request $request)
    {

        $data = $request->all();

        $pagination = Contenido::where([
            ['titulo', 'like', '%' . $data['q'] . '%', 'OR'],
            ['slug', 'like', '%' . $data['q'] . '%', 'OR'],
            ['contenido', 'like', '%' . $data['q'] . '%', 'OR'],
        ])
            ->whereHas('usuario', function (Builder $q) use ($data) {
                $q->orWhere([
                    ['nombre', 'like', '%' . $data['q'] . '%', 'OR'],
                    ['apellido', 'like', '%' . $data['q'] . '%', 'OR'],
                    ['email', 'like', '%' . $data['q'] . '%', 'OR'],
                ]);
            })
            ->where('status',1)
            ->whereHas('categorias',function(Builder $query) use($data) {

                if(isset($data['categoria_id'])){
                    $query->where('id', $data['categoria_id']);
                }else{
                    $query->where('id','>',0);
                }
                
            })


            ->orderBy($data['sortBy'] ?: 'id', $data['sortDesc'] ? 'desc' : 'asc')
            ->paginate($data['perPage'] == 0 ? 10000 : $data['perPage']);


        $contenidos = $pagination->items();

        foreach ($contenidos as $contenido) {
            $contenido->usuario;
            $contenido->usuario->avatar = $contenido->usuario->getAvatar();
            $contenido->comentarios;
            $contenido->likes;
            $contenido->categorias;

            foreach ($contenido->comentarios as $comentario) {
                if($comentario->usuario){
                    $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
                }
            }
        }


        return response()->json([
            'contenidos' => $contenidos,
            'total' => $pagination->total(),
        ]);
    }



    public function validar(Request $request,Contenido $contenido = null){

        return $request->validate([
            'id' => 'nullable',
            'titulo' => ['required', $contenido ? Rule::unique('contenidos','titulo')->ignore($contenido,'titulo') : 'unique:contenidos,titulo'],
            'slug' => ['required',$contenido ? Rule::unique('contenidos','slug')->ignore($contenido) :  'unique:contenidos,slug'],
            'status' => 'nullable',
            'contenido' => 'required',
            'banner' => 'required_without:id',
            'usuario_id' => 'nullable',
            'categorias' => 'required'
        ],[
            'titulo.unique' => 'El titulo ya ha sido creado anteriormente, el mismo no puede ser igual',
            'slug.unique' => 'El Slug es importante no lo olvides',
            'banner.required_without' => 'La Imagen principal es importante no lo olvides'
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
       
            if($datos['banner']){
                $banner = $request->file('banner');

                $banner_name = \sha1($banner->getClientOriginalName()).'.'.$banner->getClientOriginalExtension();
                Storage::disk('banner-blog')->put($banner_name,File::get($banner));
            }
            $contenido = Contenido::create([...$datos,...['banner' => $banner_name,'slug' => Str::slug($datos['slug']), 'usuario_id' =>  $request->user()->id]]);


            foreach (explode(',', $datos['categorias'])  as $key => $categoria) {
                $contenido->categorias()->attach($categoria);
            }
         


            $contenido->usuario->avatar = $contenido->usuario->getAvatar();
            $contenido->comentarios;
            $contenido->likes;
            $contenido->categorias;
            foreach ($contenido->comentarios as $comentario) {
                $comentario->usuario;
                $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
            }



            DB::commit();
            $result = true;


        }catch(\Exception $e){
            DB::rollBack();
            dd($e->getMessage());
            $result = false;
        }
        return response()->json(['result' => $result,'contenido' => $result ? $contenido : null]);

    }

   

   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Contenido  $contenido
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contenido $contenido)
    {
        $datos = $this->validar($request,$contenido);
        
        try {
            DB::beginTransaction();

            if ($datos['banner'] && $datos['banner'] != 'null') {
                Storage::disk('banner-blog')->delete($contenido->banner);
                $banner = $request->file('banner');
                $banner_name = \sha1($banner->getClientOriginalName()) . '.' . $banner->getClientOriginalExtension();
                Storage::disk('banner-blog')->put($banner_name, File::get($banner));
            }

            

            $contenido->update([...$datos, ...[
                'banner' => $datos['banner'] && $datos['banner'] != "null" ? $banner_name : $contenido->banner,
                'slug' => Str::slug($datos['slug']),
                'usuario_id' => $datos['usuario_id'] ?: $request->user()->id
            ]]);

            $contenido->usuario->avatar = $contenido->usuario->getAvatar();
            $contenido->comentarios;
            $contenido->likes;
            $contenido->categorias;
            foreach ($contenido->comentarios as $comentario) {
                $comentario->usuario;
                $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
            }



            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }
        return response()->json(['result' => $result, 'contenido' => $result ? $contenido : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contenido  $contenido
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contenido $contenido)
    {
        try{
            DB::beginTransaction();

            $contenido->delete();
            
            DB::commit();

            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function fetch(Contenido $contenido){

        $contenido->usuario->avatar = $contenido->usuario->getAvatar();
        $contenido->comentarios;
        $contenido->likes;
        $contenido->categorias;

        foreach ($contenido->comentarios as $comentario) {
            if($comentario->usuario){
                $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
            }
        }


        return response()->json($contenido);

    }

    public function fetchPorSlug(string $slug){
        $contenido = Contenido::where('slug',$slug)->first();
        
        $contenido->usuario->avatar = $contenido->usuario->getAvatar();
        $contenido->comentarios;
        $contenido->likes;
        $contenido->categorias;

        foreach ($contenido->comentarios as $comentario) {
            if ($comentario->usuario) {
                $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
            }
        }


        return response()->json($contenido);
    }


    public function removerFavorito(Contenido $contenido, User $usuario){

        try{
            DB::beginTransaction();

            $contenido->likes()->detach($usuario->id);
            
            DB::commit();
            $result = true;
        }catch(\Exception $e){
            DB::rollBack();
            $result = false;

        }

        $contenido->usuario->avatar = $contenido->usuario->getAvatar();
        $contenido->comentarios;
        $contenido->likes;
        $contenido->categorias;

        foreach ($contenido->comentarios as $comentario) {
            $comentario->usuario;
            $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
        }


        return response()->json(['result' => $result,'contenido' => $contenido]);

    }

    public function addFavorito(Contenido $contenido, User $usuario)
    {
        try {
            DB::beginTransaction();

            $contenido->likes()->attach($usuario->id);

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        $contenido->usuario->avatar = $contenido->usuario->getAvatar();
        $contenido->comentarios;
        $contenido->likes;
        $contenido->categorias;

        foreach ($contenido->comentarios as $comentario) {
            $comentario->usuario;
            $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
        }


        return response()->json(['result' => $result,'contenido' => $contenido]);

    }

    public function ultimosRecientes(){

        $contenidos = Contenido::where('status',1)
                        ->whereRaw('created_at >= date_sub(curdate(), INTERVAL 3 MONTH )')
                        ->orderBy('id','desc')
                        ->limit(5)
                        ->get();

        foreach ($contenidos as $key => $contenido) {
            if($contenido->usuario){
                $contenido->usuario->avatar = $contenido->usuario->getAvatar();
            }
            $contenido->comentarios;
            $contenido->likes;
            $contenido->categorias;
            foreach ($contenido->comentarios as $comentario) {
                if($comentario->usuario){
                    $comentario->usuario->avatar = $comentario?->usuario->getAvatar();
                }
                
            }
        }

        return response()->json($contenidos);
    }





}
