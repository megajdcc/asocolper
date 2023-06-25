<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaServicio extends Model
{
    use HasFactory;

    protected $table = 'categoria_servicios';

    protected $fillable = [
        'nombre',
        'breve',
    ];

    public function servicios(){
        return $this->hasMany(Servicio::class,'servicio_id','id');

    }
    
}
