<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'icono'
    ];

    public function contenidos(){
        return $this->belongsToMany(Contenido::class,'contenido_categorias','categoria_id','contenido_id');

    }
    
}
