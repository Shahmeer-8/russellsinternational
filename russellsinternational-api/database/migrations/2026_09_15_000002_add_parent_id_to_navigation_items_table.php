<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Lets a header link own other links, so the navigation can group Study Abroad,
 * Languages and Ausbildung under one menu instead of spreading them across the bar.
 *
 * Deliberately one level only: the API nests children under their parent and the
 * navbar renders a single dropdown, so a grandchild would be saved and never
 * shown. The admin form enforces the same rule by offering only top-level items
 * as parents.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('navigation_items', function (Blueprint $table) {
            $table->foreignId('parent_id')
                ->nullable()
                ->after('location')
                ->constrained('navigation_items')
                // A parent going away takes its submenu with it: a child left behind
                // would be orphaned into the top level, silently changing the menu.
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('navigation_items', function (Blueprint $table) {
            $table->dropConstrainedForeignId('parent_id');
        });
    }
};
