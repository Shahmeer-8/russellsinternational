<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('duration');             // "3 Months"
            $table->string('type')->default('Paid'); // Paid|Unpaid|Stipend
            $table->text('description');
            $table->json('skills')->nullable();     // ["React", "TypeScript"]
            $table->json('gains')->nullable();      // ["Real-world experience", ...]
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
