<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'imagen',
        'perfil',
        'correo',
        'telefono',
    ];


    public function getAvatar()
    {

        if (empty($this->imagen)) {
            $this->imagen = 'default.jpg';

            return asset('storage/img-perfil/' . $this->imagen);
        } else {
            return asset('storage/socios/' . $this->imagen);
        }
        
    }
    
}
