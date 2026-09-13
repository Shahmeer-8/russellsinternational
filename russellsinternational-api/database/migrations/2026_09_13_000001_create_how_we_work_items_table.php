<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('how_we_work_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            // Quote and author are separate so the admin can style them apart and
            // never has to type the em-dash attribution by hand.
            $table->text('quote');
            $table->string('author')->nullable();
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('how_we_work_items');
    }
};
