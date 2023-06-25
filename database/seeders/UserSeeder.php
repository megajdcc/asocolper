<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{User};
use App\Models\Usuario\{Rol,Permiso};
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

            $permisos = [
                'all',
                'home',
                'perfil',
                'roles',
                'permisos',
                "notificaciones",
                "usuarios",
            ];

            $actions = ['manage','read','write','delete','update'];

            $permisos_registrados = collect([]);

            
            foreach ($permisos as $key => $value) {
                $permisos_registrados->push(Permiso::create(['nombre' => $value]));        
            }

            
            $roles = ["Desarrollador",'Administrador'];

            foreach ($roles as $key => $value) {
                $rol = Rol::create(['nombre'=> $value]);

                if($rol->nombre == 'Desarrollador'){
                    foreach ($permisos_registrados as $k => $v) {
                     $rol->permisos()->attach($v->id, ['actions' => json_encode($actions)]);
                    }
                }
            }

    		$usuario = User::create([
				'nombre'   => 'Jhonatan Deivyth',
				'apellido' => 'Crespo Colmenarez',
				'telefono' => '+584128505504',
				'email' => 'megajdcc2009@gmail.com',
				'password' => Hash::make('12345678jd'),
                'is_password' => true,
                'rol_id' => Rol::where('nombre','Desarrollador')->first()->id
    		]);

            $usuario->asignarPermisosPorRol();

            $textToken = ($usuario->createToken($usuario->nombre.'-'.$usuario->id))->plainTextToken;

            $usuario->token = $textToken;

            $usuario->save();
    }
}
