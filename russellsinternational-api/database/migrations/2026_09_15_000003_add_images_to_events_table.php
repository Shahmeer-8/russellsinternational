<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Extra photographs for an event, beyond the single cover image.
 *
 * Events now open as their own page rather than a drawer, and a page about an
 * event that ran wants a few pictures of it. The existing `image` column stays as
 * the cover — the one that appears on the card in the listing — and these are the
 * rest, in the order the admin arranges them.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->json('images')->nullable()->after('image');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('images');
        });
    }
};
