<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * The Careers page now splits internships into "Paid Internships" and "Summer
 * Internship Programs". That split is a season, not a pay arrangement, so it
 * cannot reuse `type` (Paid/Unpaid/Stipend) — a summer programme may well be
 * paid. Existing rows become `regular`, which is where they were shown before.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('internships', function (Blueprint $table) {
            $table->string('category', 20)->default('regular')->after('type');
            $table->index(['category', 'is_active']);
        });
    }

    public function down(): void
    {
        Schema::table('internships', function (Blueprint $table) {
            $table->dropIndex(['category', 'is_active']);
            $table->dropColumn('category');
        });
    }
};
