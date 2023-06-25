<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Trais\Has_roles;


use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\Channel;
use App\Models\Usuario\{Rol,Permiso};
use App\Notifications\WelcomeUsuario;

use App\Models\Comentario;


class User extends Authenticatable
{
    use HasApiTokens,HasFactory, Notifiable;
    use Has_roles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'telefono',
        'bio',
        'fecha_nacimiento',
        'codigo_postal',
        'activo', // activo o no valor booleano
        'imagen',
        'direccion',
        'email',
        'password',
        'is_password',
        'rol_id',
        'token',
        'firma_digital'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'token'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_password' => 'boolean',
        'activo' => 'boolean'
    ];


    protected $attributes = [
        'activo' => true
    ];

    public function getUrlAvatar(){

            if(is_null($this->imagen)){
                return asset('/storage/img-perfil/default.jpg');
            }else{
                return asset('/storage/img-perfil/'.$this->imagen);
            }
        
        // return app('url').'/storage/img-perfil/'.$this->imagen;
        
    }

   

    public function getAvatar(){
        
        if(empty($this->imagen)){
            $this->imagen = 'default.jpg';

            return asset('storage/img-perfil/'.$this->imagen);
        }else{
             return asset('storage/img-perfil/'.$this->imagen);
        }

    }

    public function getNombreCompleto(){
       return $this->nombre . ' '. $this->apellido;
    }


    public function rol(){
        return $this->belongsTo(Rol::class,'rol_id','id');
    }

    public function permisos(){
        return $this->belongsToMany(Permiso::class,'usuario_permisos','usuario_id','permiso_id')->withPivot(['action']);
    }

    public function getTokenText(){
        return $this->token;
    }

    public static function getUsuarios($filter){

        // return User::orderBy($filter['sortBy'])
        //             ->take($filter['perPage'])

    }


    public function getFullName(){
        return $this->nombre . ' '. $this->apellido; 
    }


    public function comentarios(){
        return $this->hasMany(Comentario::class,'usuario_id','id');
    }


    public function likes()
    {
        return $this->belongsToMany(Contenido::class, 'likes', 'usuario_id', 'contenido_id');
    }
   




}
