<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'nombre',
        'logo',
        'url'
    ];

    public function getLogo()
    {

        if (empty($this->logo)) {
            $this->logo = 'default.jpg';
            return asset('storage/img-perfil/' . $this->logo);
        } else {
            return asset('storage/clientes/logotipos/' . $this->logo);
        }

    }

}
