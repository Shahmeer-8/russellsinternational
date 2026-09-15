<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * A downloadable brochure for every kind of programme, not just courses.
 *
 * Courses have had `pdf_brochure` from the start, and the detail panel offers the
 * download when one is uploaded. Every other panel on the site — services,
 * language programmes, internships, jobs, study destinations — opens the same way
 * and had nowhere to attach one, so a visitor reading about IELTS coaching could
 * not take the details away with them.
 */
return new class extends Migration
{
    /** Tables that get a brochure. `courses` already has one. */
    private const TABLES = [
        'services',
        'language_programs',
        'internships',
        'jobs',
        'study_destinations',
    ];

    public function up(): void
    {
        foreach (self::TABLES as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->string('pdf_brochure')->nullable();
            });
        }
    }

    public function down(): void
    {
        foreach (self::TABLES as $table) {
            Schema::table($table, function (Blueprint $blueprint) {
                $blueprint->dropColumn('pdf_brochure');
            });
        }
    }
};
