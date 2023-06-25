<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\{Sucursal, User};
use App\Models\{Cliente, Socio, Contenido, Servicio};
use Illuminate\Support\Facades\{DB};

use Illuminate\Database\Eloquent\Builder;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {

        $usuario = $request->user();

        $usuario->rol = $usuario->rol;

        if ($usuario->roles->first()) {
            $usuario->roles->first()->permissions;
        }

        $usuario->avatar = $usuario->getAvatar();


        return view('home', compact('usuario'));
    }


    public function getDataApp(Request $request)
    {

        $usuario = $request->user();
        $usuario->rol = $usuario->rol;

        if ($usuario->roles->first()) {
            $usuario->roles->first()->permissions;
        }

        $usuario->avatar = $usuario->getAvatar();

        return response()->json($usuario);
    }





    public function getData()
    {

        $contenido_mensuales_publicados = DB::table('contenidos', 'c')
            ->selectRaw('count(*) as cantidad, month(c.created_at) as mes, year(c.created_at) as ano')
            ->whereRaw('year(now()) = year(c.created_at) && c.status = 1')
            ->groupBy(['mes', 'ano'])
            ->get();

        $contenido_mensuales_pendiente = DB::table('contenidos', 'c')
            ->selectRaw('count(*) as cantidad, month(c.created_at) as mes, year(c.created_at) as ano')
            ->whereRaw('year(now()) = year(c.created_at) && c.status = 2 || c.status = 3')
            ->groupBy(['mes', 'ano'])
            ->get();



        $sin_publicar = collect([]);
        $publicadas = collect([]);



        for ($i = 1; $i <= 12; $i++) {

            $sin_publicar->push($contenido_mensuales_pendiente->where('mes', $i)->first()?->cantidad ?: 0);
            $publicadas->push($contenido_mensuales_publicados->where('mes', $i)->first()?->cantidad ?: 0);
        }

        $contenido_mensuales = [

            [
                'label' => 'Publicadas',
                'backgroundColor' => '#f87979',
                'data' => $publicadas
            ],

            [
                'label' => 'Sin Publicar',
                'backgroundColor' => '#4ab30d',
                'data' => $sin_publicar
            ]

        ];

        $result = collect([
            'socios' => Socio::get()->count(),
            'clientes' => Cliente::get()->count(),
            'contenidos_publicados' => Contenido::where('status', 1)->count(),
            'usuarios' => User::get()->count(),
            'servicios' => Servicio::get()->count(),
            'sucursales' => Sucursal::get()->count(),
            'contenido_mensuales' => $contenido_mensuales,
        ]);

        return response()->json($result);
    }

    public function tableroUser()
    {

        $result = [];
        return response()->json($result);
    }
}
