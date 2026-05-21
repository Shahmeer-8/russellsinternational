<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('why_choose_us_items', function (Blueprint $table) {
            $table->id();
            $table->string('icon_name');
            $table->string('title');
            $table->text('description');
            $table->string('color_class')->default('bg-blue-50 text-blue-600');
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('why_choose_us_items');
    }
};
