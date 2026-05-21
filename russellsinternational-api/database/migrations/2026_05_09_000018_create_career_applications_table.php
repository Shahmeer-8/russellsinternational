<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('career_applications', function (Blueprint $table) {
            $table->id();
            $table->enum('application_type', ['job', 'internship'])->default('job');
            $table->unsignedBigInteger('position_id')->nullable(); // FK to jobs or internships
            $table->string('position_title');
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('cv_path')->nullable();   // Uploaded CV file path
            $table->string('portfolio_url')->nullable();
            $table->enum('status', ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('career_applications');
    }
};
