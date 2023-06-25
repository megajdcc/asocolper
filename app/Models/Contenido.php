<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contenido extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'slug',
        'status',
        'contenido',
        'banner',
        'usuario_id'
    ];

    protected $attributes = [
        'status' => 2, // 1 => publicado , 2 => pendiente , 3 => borrador
    ];

    
    public function categorias(){
        return $this->belongsToMany(Categoria::class,'contenido_categorias','contenido_id','categoria_id');
    }

    public function comentarios(){
        return $this->hasMany(Comentario::class,'contenido_id','id');
    }

    public function likes(){
        return $this->belongsToMany(User::class,'likes','contenido_id','usuario_id');
    }

    public function usuario(){
        return $this->belongsTo(User::class,'usuario_id','id');
    }

    
}
