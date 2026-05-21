<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['paid', 'navttc'])->default('paid');
            $table->string('icon_name')->default('Code');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('duration');             // "6 Months"
            $table->string('students_count');       // "450+"
            $table->string('price')->nullable();    // null for NAVTTC (free)
            $table->string('tag')->nullable();      // "Bestseller", "New", "NAVTTC"
            $table->string('color_class')->default('bg-blue-50 text-blue-600');
            $table->json('what_you_learn')->nullable();  // ["Item 1", ...]
            $table->json('highlights')->nullable();      // ["Expert Trainers", ...]
            $table->string('pdf_brochure')->nullable();  // Downloadable PDF path
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
