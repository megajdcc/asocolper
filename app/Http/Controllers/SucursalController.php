<?php

namespace App\Http\Controllers;

use App\Models\Sucursal;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Support\Facades\{DB};


class SucursalController extends Controller
{
    public function all()
    {

        $sucursales = Sucursal::all();

        foreach ($sucursales as $sucursal) {

            $sucursal->sistema;
            $sucursal->ciudad;
            $sucursal->estado;
            $sucursal->estado?->pais;
            
        }

        return response()->json($sucursales);
    }


    public function fetchData(Request $request)
    {

        $data = $request->all();

        $pagination = Sucursal::where([
            ['direccion', 'LIKE', '%' . $data['q'] . '%', 'OR'], 
            ['telefonos', 'LIKE', '%' . $data['q'] . '%', 'OR'],
            ['codigo_postal', 'LIKE', '%' . $data['q'] . '%', 'OR'],
            ['lng', 'LIKE', '%' . $data['q'] . '%', 'OR'],['lat', 'LIKE', '%' . $data['q'] . '%', 'OR'],
        ])
        ->whereHas('ciudad',function(Builder $query) use ($data){
            $query->orWhere([
                ['ciudad','LIKE','%'.$data['q'].'%','OR']
            ]);

        })

        ->whereHas('estado', function (Builder $query) use ($data) {
            $query->orWhere([
                ['estado', 'LIKE', '%' . $data['q'] . '%', 'OR']
            ])->orWhereHas('pais',function(Builder $q) use($data) {
                $q->orWhere([
                    ['pais','LIKE','%'.$data['q'].'%','OR']
                ]);
            });
        })
        ->orderBy($data['sortBy'] ?: 'id', $data['sortDesc'] ? 'desc' : 'asc')
        ->paginate($data['perPage'] ?: 10000);

        $sucursales = $pagination->items();

        foreach ($sucursales as $sucursal) {
            $sucursal->sistema;
            $sucursal->ciudad;
            $sucursal->estado;
            $sucursal->estado?->pais;
        }


        return [
            'sucursales' => $sucursales,
            'total' => $pagination->total()
        ];
    }


    private function validar(Request $request, Sucursal $sucursal = null): array
    {

        return $request->validate([
           'direccion'     => 'required',
           'estado_id'     => 'required',
           'ciudad_id'     => 'nullable',
           'principal'     => 'required',
           'codigo_postal' => 'nullable',
           'lat'           => 'nullable',
           'lng'           => 'nullable',
           'sistema_id'    => 'nullable',
           'telefonos'     => 'required',
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

        try {
            DB::beginTransaction();

            if ($datos['principal'] && $datos['principal'] == true) {
                foreach(Sucursal::where('principal',true)->get() as $oficina){
                    $oficina->principal = false;
                    $oficina->save();
                }

            }

            $sucursal = Sucursal::create($datos);

            $sucursal->sistema;
            $sucursal->ciudad;
            $sucursal->estado;
            $sucursal->estado?->pais;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();

            $result = false;
        }

        return response()->json(['result' => $result, 'sucursal' => $result ? $sucursal : null]);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sucursal $sucursal)
    {

        $datos = $this->validar($request, $sucursal);


        try {
            DB::beginTransaction();
            if ($datos['principal'] && $datos['principal'] == true) {
                foreach (Sucursal::where('principal', true)->get() as $oficina) {
                    $oficina->principal = false;
                    $oficina->save();
                }
            }

            $sucursal->update($datos);

            $sucursal->sistema;
            $sucursal->ciudad;
            $sucursal->estado;
            $sucursal->estado?->pais;

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();

            $result = false;
        }

        return response()->json(['result' => $result, 'sucursal' => $sucursal]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sucursal  $sucursal
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sucursal $sucursal)
    {
        try {
            DB::beginTransaction();
            $sucursal->delete();

            DB::commit();
            $result  = true;
        } catch (\Exception $e) {
            DB::rollBack();


            $result = false;
        }

        return response()->json(['result' => $result]);
    }

    public function fetch(Sucursal $sucursal)
    {

        $sucursal->sistema;
        $sucursal->ciudad;
        $sucursal->estado;
        $sucursal->estado?->pais;
        
        return response()->json($sucursal);
    }
}
