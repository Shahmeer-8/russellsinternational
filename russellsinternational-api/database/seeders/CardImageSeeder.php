<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\WhyChooseUsItem;
use Illuminate\Database\Seeder;

/**
 * Gives the two card grids their pictures.
 *
 * Matched on title so re-running is safe, and only fills an image that is still
 * empty — once the owner uploads their own photo for a card, this leaves it alone.
 */
class CardImageSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->serviceImages() as $title => $image) {
            Service::query()
                ->where('title', $title)
                ->whereNull('image')
                ->update(['image' => $image]);
        }

        foreach ($this->whyChooseUsImages() as $title => $image) {
            WhyChooseUsItem::query()
                ->where('title', $title)
                ->whereNull('image')
                ->update(['image' => $image]);
        }
    }

    /** @return array<string, string> */
    private function serviceImages(): array
    {
        return [
            'IT & Skill Training' => 'services/it-skill-training.jpg',
            'Study Abroad Consultancy' => 'services/study-abroad-consultancy.jpg',
            'IELTS Preparation' => 'services/ielts-preparation.jpg',
            'NAVTTC Programs' => 'services/navttc-programs.jpg',
            'Career Counseling' => 'services/career-counseling.jpg',
            'Corporate Trainings' => 'services/corporate-trainings.jpg',
        ];
    }

    /** @return array<string, string> */
    private function whyChooseUsImages(): array
    {
        return [
            'Experienced Consultants' => 'why-choose-us/experienced-consultants.jpg',
            '95% Visa Success' => 'why-choose-us/visa-success.jpg',
            'Global University Network' => 'why-choose-us/global-university-network.jpg',
            'Career-Focused Training' => 'why-choose-us/career-focused-training.jpg',
            '5,000+ Alumni' => 'why-choose-us/alumni.jpg',
            'End-to-End Support' => 'why-choose-us/end-to-end-support.jpg',
        ];
    }
}
