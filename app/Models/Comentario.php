<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    use HasFactory;

    protected $fillable = [
        'comentario',
        'usuario_id',
        'contenido_id',
        'comentario_id',
        'nombre',
        'email',
        'telefono'
    ];

    public function contenido(){
        return $this->belongsTo(Contenido::class,'contenido_id','id');
    }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');

    }

    public function comentario(){
        return $this->belongsTo(Comentario::class,'comentario_id','id');
    }

    public function comentarios(){
        return $this->hasMany(Comentario::class,'comentario_id','id');
    }
    
}
