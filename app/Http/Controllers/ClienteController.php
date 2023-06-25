<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\{DB,Storage,File};


class ClienteController extends Controller
{

    public function getClientes(){

        $clientes = Cliente::all();


        foreach ($clientes as $key => $cliente) {
            $cliente->logotipo = $cliente->getLogo();
        }

        return response()->json($clientes);
    }
    

    public function fetchData(Request $request)
    {
        $datos  = $request->all();

        $pagination = Cliente::where([
            ['nombre', 'LIKE', "%{$datos['q']}%", 'OR'],
        ])
            ->orderBy($datos['sortBy'] ?: 'id', $datos['sortDesc'] ? 'desc' : 'asc')
            ->paginate($datos['perPage'] == 0 ? 10000 : $datos['perPage']);


        $clientes = $pagination->items();

        foreach ($clientes as $key => $cliente) {
            $cliente->logotipo = $cliente->getLogo();
        }

        return response()->json([
            'clientes' => $clientes,
            'total' => $pagination->total(),
        ]);
    }



    private function validar(Request $request, Cliente $cliente = null): array
    {
        return $request->validate([
            'id' => 'nullable',
            'nombre'   => 'required',
            'logo' => 'required_without:id',
            'url' => 'nullable'
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

            $logo_name = null;

            if ($datos['logo'] && $datos['logo'] != 'null') {
                $logo = $request->file('logo');

                $logo_name  = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();

                Storage::disk('cliente_logos')->put($logo_name, File::get($logo));
            }


            $cliente = Cliente::create([...$datos, ...[
                'logo' => $logo_name ?: null,
            ]]);


            $cliente->logotipo = $cliente->getLogo();

            DB::commit();
            $result = true;
        } catch (\Exception $e) {

            DB::rollBack();

            dd($e->getMessage());

            $result = false;
        }

        return response()->json(['result' => $result, 'cliente' => $result ? $cliente : null]);
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        $datos = $this->validar($request);

        try {
            DB::beginTransaction();

            $logo_name = $cliente->logo;

            if ($datos['logo'] && $datos['logo'] != 'null') {

                Storage::disk('cliente_logos')->delete($cliente->logo);

                $logo = $request->file('logo');

                $logo_name  = \sha1($logo->getClientOriginalName()) . '.' . $logo->getClientOriginalExtension();

                Storage::disk('cliente_logos')->put($logo_name, File::get($logo));
            }


            $cliente->update([...$datos, ...[
                'logo' => $logo_name ?: null,
            ]]);


            $cliente->logotipo = $cliente->getLogo();

            DB::commit();
            $result = true;
        } catch (\Exception $e) {
            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result, 'cliente' => $result ? $cliente : null]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        try {
            DB::beginTransaction();

            Storage::disk('cliente_logos')->delete($cliente->logo);

            $cliente->delete();
            DB::commit();
            $result = true;
        } catch (\Exception $e) {

            DB::rollBack();
            $result = false;
        }

        return response()->json(['result' => $result]);
    }


    public function fetch(Cliente $cliente)
    {

        $cliente->logotipo = $cliente->getLogo();

        return response()->json($cliente);
    }
}
