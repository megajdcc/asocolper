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
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id();
            $table->text('comentario');
            $table->foreignId('usuario_id')->nullable()->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('contenido_id')->constrained('contenidos')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('nombre')->nullable();
            $table->string('email')->nullable();
            $table->string('telefono')->nullable();
            
            $table->timestamps();
        });

        Schema::table('comentarios',function(Blueprint $table){
            $table->foreignId('comentario_id')->nullable()->constrained('comentarios')->cascadeOnDelete()->cascadeOnUpdate();
        });
        

        Schema::create('likes',function(Blueprint $table){
            $table->foreignId('usuario_id')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('contenido_id')->constrained('contenidos')->cascadeOnDelete()->cascadeOnUpdate();
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comentarios');
        Schema::dropIfExists('likes');

    }
};
