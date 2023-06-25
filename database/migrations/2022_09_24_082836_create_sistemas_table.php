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
        Schema::create('sistemas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('logo')->nullable();
            $table->string('logoblack')->nullable();
            $table->text('descripcion')->nullable();
            $table->text('head')->nullable();
            $table->text('body')->nullable();
            $table->json('redes')->nullable();
            $table->text('lema')->nullable();
            $table->json('metas')->nullable();
            $table->string('favicon')->nullable();
            $table->foreignId('usuario_id')->nullable()->constrained('users')->onDelete('set null')->cascadeOnUpdate();
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
        Schema::dropIfExists('sistemas');
    }
};
