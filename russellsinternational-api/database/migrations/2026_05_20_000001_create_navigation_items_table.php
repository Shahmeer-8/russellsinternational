<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('navigation_items', function (Blueprint $table) {
            $table->id();
            $table->string('location', 20)->index();
            $table->string('footer_column', 100)->nullable()->index();
            $table->string('label');
            $table->string('url', 500);
            $table->string('target', 20)->default('_self');
            $table->string('badge_label', 40)->nullable();
            $table->string('badge_variant', 40)->nullable();
            $table->string('badge_animation', 40)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navigation_items');
    }
};
