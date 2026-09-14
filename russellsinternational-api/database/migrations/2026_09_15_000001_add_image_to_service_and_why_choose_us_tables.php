<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Both card grids were an icon, a title and two lines of text in a tall box, which
 * left most of each card empty. They get a picture.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('image')->nullable()->after('icon_name');
        });

        Schema::table('why_choose_us_items', function (Blueprint $table) {
            $table->string('image')->nullable()->after('icon_name');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('image');
        });

        Schema::table('why_choose_us_items', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
