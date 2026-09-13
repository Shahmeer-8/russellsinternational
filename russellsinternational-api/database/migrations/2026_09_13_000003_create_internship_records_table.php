<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('internship_records', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            // Free text rather than dates: cohorts are described as "Summer 2025"
            // or "Winter 2024/25", which no date range renders as neatly.
            $table->string('period');
            $table->unsignedSmallInteger('participants_count')->nullable();
            $table->text('description')->nullable();
            $table->json('achievements')->nullable();
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('internship_records');
    }
};
