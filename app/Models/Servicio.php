<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'subtitulo',
        'breve',
        'banner',
        'url',
        'contenido',
        'usuario_id',
        'servicio_id',
        'categoria_id',
    ];


    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    public function servicio(){
        return $this->belongsTo(Servicio::class,'servicio_id','id');
    }

    public function subServicios(){
        return $this->hasMany(Servicio::class,'servicio_id','id');
    }

    public function categoria(){
        return $this->belongsTo(CategoriaServicio::class,'categoria_id','id');
    }



}
