<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

/**
 * Points the existing "What We Do" cards at the pages that already cover them.
 *
 * Matched on title because these are the six seeded services and the admin can
 * change any destination afterwards. Only fills a card that has no destination
 * yet, so re-running never overrides a choice made in the panel.
 *
 * Corporate Trainings is deliberately absent: there is no page for it, so its
 * card keeps the details panel until the client decides where it should go.
 */
class ServiceLinkSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->links() as $title => $url) {
            Service::query()
                ->where('title', $title)
                ->whereNull('link_url')
                ->update(['link_url' => $url]);
        }
    }

    /** @return array<string, string> */
    private function links(): array
    {
        return [
            'IT & Skill Training' => '/skills',
            'Study Abroad Consultancy' => '/study-abroad',
            // IELTS sits under English Tests on the Languages page.
            'IELTS Preparation' => '/languages',
            // The NAVTTC tab is part of the courses section on Skills.
            'NAVTTC Programs' => '/skills#courses',
            'Career Counseling' => '/careers',
        ];
    }
}
