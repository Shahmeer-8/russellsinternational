<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Where a "What We Do" card takes the visitor.
 *
 * The cards opened a side panel summarising the service, which is a dead end: the
 * site already has a whole page for most of them. With a destination set the card
 * goes there instead; left empty it keeps the panel, which is the right answer for
 * a service with no page of its own.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('link_url', 500)->nullable()->after('details');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('link_url');
        });
    }
};
