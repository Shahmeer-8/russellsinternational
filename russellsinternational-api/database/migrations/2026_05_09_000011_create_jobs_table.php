<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->enum('type', ['Full-Time', 'Part-Time', 'Contract', 'Remote'])->default('Full-Time');
            $table->string('salary')->nullable();
            $table->text('description');
            $table->json('requirements')->nullable();    // ["2+ years exp", ...]
            $table->string('application_email')->nullable();
            $table->date('deadline')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
