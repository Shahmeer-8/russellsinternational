<?php

namespace Database\Seeders;

use App\Models\HowWeWorkItem;
use App\Models\PageSection;
use Illuminate\Database\Seeder;

/**
 * Content carried over from the organisation's existing site
 * (russellsinternational.com), where this ran as a filterable gallery.
 *
 * Keyed on title via updateOrCreate so re-running never duplicates a card, and
 * so an admin who reworded a quote keeps that wording only if they also renamed
 * the card — titles are the stable identity here because there is no slug column.
 */
class HowWeWorkSeeder extends Seeder
{
    public function run(): void
    {
        PageSection::updateOrCreate(
            ['page_slug' => 'about', 'section_key' => 'how_we_work'],
            [
                'name' => 'About Page How We Work Heading',
                'eyebrow' => 'Our approach',
                'title' => 'How we work with you',
                'subtitle' => 'Six ways we partner with people and organisations — from developing leaders to building resilience and professional performance.',
                'sort_order' => 45,
                'is_active' => true,
            ],
        );

        foreach ($this->items() as $index => $item) {
            HowWeWorkItem::updateOrCreate(
                ['title' => $item['title']],
                $item + ['sort_order' => $index + 1, 'is_active' => true],
            );
        }
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function items(): array
    {
        return [
            [
                'title' => 'Leadership Development',
                'quote' => 'Leadership, like swimming, cannot be learned by reading about it.',
                'author' => 'Henry Mintzberg',
                'image' => 'how-we-work/leadership-development.jpg',
            ],
            [
                'title' => 'Coaching and Mentoring',
                'quote' => 'Winning companies win because they have good leaders who nurture the development of other leaders at all levels of the organization.',
                'author' => 'Noel Tichy',
                'image' => 'how-we-work/coaching-and-mentoring.jpg',
            ],
            [
                'title' => 'Team and Individual Effectiveness',
                'quote' => 'The strength of the team is each individual member. The strength of each member is the team.',
                'author' => 'Phil Jackson',
                'image' => 'how-we-work/team-and-individual-effectiveness.jpg',
            ],
            [
                'title' => 'Executive Consultancy',
                'quote' => 'The executive of the future will be rated by his ability to anticipate his problems rather than to meet them as they come.',
                'author' => 'Howard Coonley',
                'image' => 'how-we-work/executive-consultancy.jpg',
            ],
            [
                'title' => 'Psychological Resilience',
                'quote' => 'It is not the strongest of the species that survives, nor the most intelligent, but the one that is able best to adapt and adjust to the changing environment in which it finds itself.',
                'author' => 'Charles Darwin',
                'image' => 'how-we-work/psychological-resilience.jpg',
            ],
            [
                'title' => 'Professional Performance',
                'quote' => 'Motivation is what gets you started. Habit is what keeps you going.',
                'author' => 'Jim Rohn',
                'image' => 'how-we-work/professional-performance.jpeg',
            ],
        ];
    }
}
