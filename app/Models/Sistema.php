<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sistema extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'logo',
        'logoblack',
        'descripcion',
        'head',
        'body',
        'redes',
        'lema',
        'usuario_id',
        'metas',
        'favicon',
        'correos',
        'quienes_somos'
    ];


    protected $casts = [
        'redes' => 'array',
        'metas' => 'array',
        'correos' => 'array'
    ];

    public function sucursales(){
        return $this->hasMany(Sucursal::class,'sistema_id','id');
    }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }
    

}
