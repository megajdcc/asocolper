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
        Schema::create('sucursals', function (Blueprint $table) {
            $table->id();
            $table->text('direccion');
            $table->boolean('principal')->default(false);
            $table->string('codigo_postal')->nullable();
            $table->json('telefonos')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->foreignId('ciudad_id')->nullable()->constrained('ciudads')->onDelete('set null')->cascadeOnUpdate();
            $table->foreignId('estado_id')->constrained('estados')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('sistema_id')->constrained('sistemas')->cascadeOnDelete()->cascadeOnUpdate();
            
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
        Schema::dropIfExists('sucursals');
    }
};
