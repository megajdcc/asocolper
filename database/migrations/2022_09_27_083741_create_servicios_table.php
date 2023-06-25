<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('categoria_servicios',function(Blueprint $table){
            $table->id();
            $table->string('nombre')->unique();
            $table->string('breve')->nullable();

            $table->timestamps();
        });


        Schema::create('servicios', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('subtitulo')->nullable();
            $table->string('breve')->nullable();
            $table->string('url')->nullable()->unique();
            $table->string('banner')->nullable();
            $table->longText('contenido');
            $table->foreignId('usuario_id')->nullable()->constrained('users')->cascadeOnUpdate()->onDelete('set null');
            $table->foreignId('servicio_id')->nullable()->constrained('servicios')->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreignId('categoria_id')->nullable()->constrained('categoria_servicios')->onDelete('set null')->cascadeOnUpdate();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categoria_servicios');    
        Schema::dropIfExists('servicios');
    }
};
