<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->enum('content_type', ['event', 'news'])->default('event');
            $table->string('tag');                  // Workshop|Seminar|Admissions|News
            $table->string('tag_color')->default('bg-blue-50 text-blue-700');
            $table->string('title');
            $table->date('event_date')->nullable();
            $table->text('short_description');
            $table->text('full_details')->nullable();
            $table->string('image')->nullable();
            $table->string('venue')->nullable();
            $table->integer('capacity')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
