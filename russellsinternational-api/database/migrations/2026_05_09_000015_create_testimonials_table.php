<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['written', 'video'])->default('written');
            $table->string('name');
            $table->string('program');              // "Study Abroad – UK"
            $table->text('quote')->nullable();      // For written testimonials
            $table->string('image')->nullable();    // Avatar for written
            $table->string('youtube_id')->nullable(); // For video testimonials
            $table->unsignedTinyInteger('rating')->default(5);
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
