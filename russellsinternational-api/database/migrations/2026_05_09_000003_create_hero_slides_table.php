<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('eyebrow');
            $table->string('title');
            $table->text('description');
            $table->string('cta_label');
            $table->string('cta_url');
            $table->string('secondary_cta_label')->default('Free Consultation');
            $table->string('secondary_cta_url')->default('/#contact');
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
