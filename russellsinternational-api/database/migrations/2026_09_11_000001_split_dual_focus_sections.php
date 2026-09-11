<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * The homepage used to render one "dual focus" block: a shared heading plus two
 * cards side by side. It is now two independent full-width sections, so the two
 * card rows are renamed to stand on their own and the shared heading row goes away.
 *
 * The rename is an update rather than a delete-and-reseed so that any copy the
 * admin edited on the live site survives. Each section needs its own intro now,
 * which lands in `subtitle` — a column the table already had and these rows never
 * used. Only empty subtitles get a default, so edited ones are left alone.
 */
return new class extends Migration
{
    private const RENAMES = [
        'dual_focus_study' => [
            'key' => 'study_abroad',
            'name' => 'Homepage Study Abroad Section',
            'subtitle' => 'Compare destinations, understand intakes and prepare a stronger application with counsellors who have placed students across the UK, Canada and Australia.',
        ],
        'dual_focus_skills' => [
            'key' => 'skills_focus',
            'name' => 'Homepage Skills Focus Section',
            'subtitle' => 'Hands-on IT programs built around real projects, so students finish with a portfolio and skills employers actually ask for.',
        ],
    ];

    public function up(): void
    {
        foreach (self::RENAMES as $oldKey => $new) {
            $section = DB::table('page_sections')
                ->where('page_slug', 'home')
                ->where('section_key', $oldKey)
                ->first();

            if (! $section) {
                continue;
            }

            DB::table('page_sections')
                ->where('id', $section->id)
                ->update([
                    'section_key' => $new['key'],
                    'name' => $new['name'],
                    'subtitle' => filled($section->subtitle) ? $section->subtitle : $new['subtitle'],
                    'updated_at' => now(),
                ]);
        }

        DB::table('page_sections')
            ->where('page_slug', 'home')
            ->where('section_key', 'dual_focus')
            ->delete();
    }

    public function down(): void
    {
        foreach (self::RENAMES as $oldKey => $new) {
            DB::table('page_sections')
                ->where('page_slug', 'home')
                ->where('section_key', $new['key'])
                ->update([
                    'section_key' => $oldKey,
                    'updated_at' => now(),
                ]);
        }

        DB::table('page_sections')->updateOrInsert(
            ['page_slug' => 'home', 'section_key' => 'dual_focus'],
            [
                'name' => 'Homepage Study Abroad and Skills Heading',
                'eyebrow' => 'Study abroad and skills',
                'title' => 'Pick the pathway that fits your next move.',
                'body' => "A quick homepage preview of Russell's two core directions: global admissions support for students planning overseas study, and practical IT training for students building career-ready skills.",
                'sort_order' => 30,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }
};
