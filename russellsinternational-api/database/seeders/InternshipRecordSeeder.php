<?php

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\InternshipRecord;
use Illuminate\Database\Seeder;

/**
 * Headings for the two internship groups and the record below them, plus starter
 * record entries.
 *
 * The records are placeholders for the client to replace with their real cohorts
 * — they exist so the section renders with something sensible rather than empty.
 * Keyed on title + period so re-running never duplicates, and so replacing one
 * with real data and re-seeding does not resurrect the placeholder.
 */
class InternshipRecordSeeder extends Seeder
{
    public function run(): void
    {
        // The three careers headings this section needs live in SectionHeadingSeeder
        // with every other heading, so there is one definition to keep in step with
        // the component fallbacks (src/lib/sectionCopy.test.ts checks that file).
        $this->call(SectionHeadingSeeder::class);

        // Existing listings pre-date the group split; keep them where they were.
        Internship::whereNull('category')->update(['category' => 'regular']);

        foreach ($this->records() as $index => $record) {
            InternshipRecord::updateOrCreate(
                ['title' => $record['title'], 'period' => $record['period']],
                $record + ['sort_order' => $index + 1, 'is_active' => true],
            );
        }
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function records(): array
    {
        return [
            [
                'title' => 'Frontend Development Internship',
                'period' => 'Summer 2025',
                'participants_count' => 24,
                'description' => 'A twelve-week cohort building real interfaces alongside our development team, from component work through to shipping production pages.',
                'achievements' => [
                    '18 interns placed in full-time roles',
                    '6 client projects shipped',
                    'Every participant finished with a portfolio site',
                ],
            ],
            [
                'title' => 'Digital Marketing Internship',
                'period' => 'Winter 2024/25',
                'participants_count' => 16,
                'description' => 'Hands-on campaign work across social, search and email, with each intern owning a live campaign end to end.',
                'achievements' => [
                    '11 interns hired by partner agencies',
                    '3 campaigns passed 100,000 impressions',
                    'Google Ads certification for the whole cohort',
                ],
            ],
            [
                'title' => 'Data Science Internship',
                'period' => 'Summer 2024',
                'participants_count' => 12,
                'description' => 'A research-led programme pairing interns with mentors on real datasets, ending in a presented analysis.',
                'achievements' => [
                    '9 interns continued into advanced study',
                    '4 analyses adopted by partner organisations',
                ],
            ],
        ];
    }
}
