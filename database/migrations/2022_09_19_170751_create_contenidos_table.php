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
        Schema::create('contenidos', function (Blueprint $table) {
            $table->id();
            $table->string('titulo')->unique();
            $table->string('slug')->unique();
            $table->tinyInteger('status')->default(2);
            $table->longText('contenido');
            $table->string('banner');
            $table->foreignId('usuario_id')->nullable()->constrained('users')->onDelete('set null')->cascadeOnUpdate();

            $table->timestamps();
        });

        Schema::create('contenido_categorias',function(Blueprint $table){

            $table->foreignId('contenido_id')->nullable()->constrained('contenidos')->cascadeOnDelete()->cascadeOnUpdate();

            $table->foreignId('categoria_id')->nullable()->constrained('categorias')->cascadeOnDelete()->cascadeOnUpdate();

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('contenido_categorias');
        Schema::dropIfExists('contenidos');
        Schema::enableForeignKeyConstraints();
    }
};
