<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'eyebrow' => 'Admissions Open 2026',
                'title' => 'Your Global Career Starts Here',
                'description' => 'Expert guidance for study abroad, skill training, and career placement — trusted by 5,000+ students.',
                'cta_label' => 'Explore Programs',
                'cta_url' => '/skills',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'eyebrow' => 'UK | Canada | Australia | USA',
                'title' => 'Study at World-Class Universities',
                'description' => 'From application to visa approval — our expert counselors ensure a smooth journey to your dream university.',
                'cta_label' => 'Study Abroad',
                'cta_url' => '/study-abroad',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'eyebrow' => 'NAVTTC Certified Programs',
                'title' => 'Master In-Demand IT Skills',
                'description' => 'Industry-aligned courses in web development, AI, cybersecurity, and more — with job placement support.',
                'cta_label' => 'View Courses',
                'cta_url' => '/skills',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($slides as $slide) {
            HeroSlide::create($slide);
        }
    }
}
