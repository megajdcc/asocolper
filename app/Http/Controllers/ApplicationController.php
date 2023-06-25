<?php

namespace App\Http\Controllers;

use App\Models\{User,Sistema};
use App\Http\Controllers\Controller;


use Illuminate\Http\Request;

use App\Notifications\NuevoMensaje;

use Illuminate\Support\Facades\Notification;
use Illuminate\Database\Eloquent\Builder;

class ApplicationController extends Controller
{

    protected Sistema $sistema;


    public function __construct(){
        $this->sistema = Sistema::first();
        $this->sistema->sucursales;
        $this->sistema->redes;
        $this->sistema->usuario;
        $this->sistema->metas;

        foreach ($this->sistema->sucursales as $sucursal){
            $sucursal->sistema;
            $sucursal->estado->pais;
            $sucursal->ciudad;
        }


    }

    public function index()
    {
        return view('application',['sistema' => $this->sistema]);
    }

    public function enviarMensajeContacto(Request $request){

        $datos = $request->validate([
            'nombre' => 'required',
            'email' => 'required',
            'asunto' => 'required',
            'mensaje' => 'required|min:30',
            'telefono' => 'required'
        ],[
            'mensaje.min' => 'El mensaje debe tener mas de 30 Caracteres...'
        ]);

        try{
            $usuarios = collect();

            $usuarios->push(User::whereHas('rol', fn (Builder $q) => $q->where('nombre', 'Desarrollador')->orWhere('nombre','Administrador'))->get());

            if ($this->sistema->usuario) {
                $usuarios->push($this->sistema->usuario);
            }

            Notification::send($usuarios, new NuevoMensaje($this->sistema, $datos));

            $result = true;
        }catch(\Exception $e){
            $result =false;

        }

        
        return response()->json(['result' => $result]);


    }
}
