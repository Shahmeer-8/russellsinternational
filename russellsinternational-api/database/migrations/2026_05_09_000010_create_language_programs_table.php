<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('language_programs', function (Blueprint $table) {
            $table->id();
            $table->string('flag_emoji');
            $table->string('language_code');    // ielts|german|korean
            $table->string('title');
            $table->string('duration');
            $table->string('badge');            // "Most Popular", "Visa-Ready"
            $table->text('description');
            $table->json('benefits');           // ["Benefit 1", ...]
            $table->string('color_class')->default('bg-blue-50 text-blue-600');
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('language_programs');
    }
};
