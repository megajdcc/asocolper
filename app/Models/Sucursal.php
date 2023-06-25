<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
    use HasFactory;

    protected $fillable = [
        'direccion',
        'principal',
        'codigo_postal',
        'telefonos', // [numero,principal] 
        'ciudad_id',
        'estado_id',
        'sistema_id',
        'lng',
        'lat',
    ];

    protected $casts = [
        'telefonos' => 'array',
        'principal' => 'boolean'
    ];

    public function sistema(){
        return $this->belongsTo(Sistema::class,'sistema_id','id');
    }


    public function ciudad(){
        return $this->belongsTo(Ciudad::class,'ciudad_id','id');
    }

    public function estado(){
        return $this->belongsTo(Estado::class,'estado_id','id');
    }
    

}
