<?php

namespace Database\Seeders;

use App\Models\PageSection;
use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Closes the gaps found auditing what the admin panel can actually reach.
 *
 * Two pieces of the site were wired to nothing: the header button, which appears
 * on every page, and the About page's team heading. Both had their wording baked
 * into the components. The rows below give them a home the owner can edit, using
 * exactly the text that was on screen so seeding changes nothing visually.
 *
 * firstOrCreate throughout: re-running never overwrites wording that has since
 * been edited in the panel.
 */
class AdminCoverageSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->settings() as $setting) {
            Setting::query()->firstOrCreate(['key' => $setting['key']], $setting);
        }

        PageSection::query()->firstOrCreate(
            ['page_slug' => 'about', 'section_key' => 'team'],
            [
                'name' => 'About — Team heading',
                'eyebrow' => 'Our people',
                'title' => 'The people behind the work',
                'sort_order' => 50,
                'is_active' => true,
            ],
        );

        foreach ($this->itemLists() as $list) {
            $this->seedItems($list['page_slug'], $list['section_key'], $list['items']);
        }
    }

    /**
     * Fills in a section's `items` rows without touching wording already saved.
     *
     * The heading rows these attach to are seeded elsewhere and may well have been
     * edited since, so this only ever writes when the section exists and has no
     * item rows at all — an owner who deleted the lot meant to, and re-running this
     * must not put them back.
     */
    private function seedItems(string $page, string $key, array $items): void
    {
        $section = PageSection::query()
            ->where('page_slug', $page)
            ->where('section_key', $key)
            ->first();

        if (! $section || ! empty($section->items)) {
            return;
        }

        $section->update(['items' => $items]);
    }

    /**
     * Lists that used to live in the frontend as literal arrays: the contact
     * form's enquiry types, which had gone stale against what the institute now
     * offers, and the course tab labels, one of which names a government scheme
     * the institute does not control.
     *
     * @return array<int, array<string, mixed>>
     */
    private function itemLists(): array
    {
        return [
            [
                'page_slug' => 'home',
                'section_key' => 'contact',
                'items' => [
                    'interest_1' => 'IT Training Courses',
                    'interest_2' => 'Study Abroad',
                    'interest_3' => 'Both',
                ],
            ],
            [
                'page_slug' => 'skills',
                'section_key' => 'courses',
                'items' => [
                    'tab_1' => 'Premium Courses',
                    'tab_2' => 'NAVTTC (Free)',
                    'tab_3' => 'Government Funded – 100% Free Training Under NAVTTC',
                ],
            ],
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function settings(): array
    {
        return [
            [
                'key' => 'nav_cta_label',
                'value' => 'Start Your Journey',
                'type' => 'text',
                'group' => 'general',
                'label' => 'Header button text',
                'description' => 'The button at the top right of every page.',
            ],
            [
                'key' => 'nav_cta_url',
                'value' => '/#contact',
                'type' => 'url',
                'group' => 'general',
                'label' => 'Header button link',
                'description' => 'Where the header button goes. Use /#contact for the contact form.',
            ],
        ];
    }
}
