<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_destinations', function (Blueprint $table) {
            $table->id();
            $table->string('flag_emoji');
            $table->string('country');
            $table->string('partner_unis_count');   // "40+"
            $table->text('description');
            $table->string('highlight_unis');       // "Oxford, Cambridge, UCL"
            $table->string('intake_periods');       // "Sept & Jan"
            $table->string('visa_success_rate');    // "98% success rate"
            $table->json('services')->nullable();   // ["University selection", ...]
            $table->json('scholarships')->nullable(); // Scholarship info
            $table->string('image')->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_destinations');
    }
};
