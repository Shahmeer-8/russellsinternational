<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Database\Seeder;

class HomePageSectionSeeder extends Seeder
{
    public function run(): void
    {
        Page::updateOrCreate(
            ['slug' => 'home'],
            [
                'name' => 'Home',
                'meta_title' => "Russell's International",
                'meta_description' => 'Study abroad guidance, skill training, language programs, jobs and internships.',
                'is_active' => true,
            ],
        );

        PageSection::updateOrCreate(
            ['page_slug' => 'home', 'section_key' => 'study_abroad'],
            [
                'name' => 'Homepage Study Abroad Section',
                'eyebrow' => 'Study Abroad',
                'subtitle' => 'Compare destinations, understand intakes and prepare a stronger application with counsellors who have placed students across the UK, Canada and Australia.',
                'title' => 'From country shortlisting to visa file guidance.',
                'body' => 'Help students compare destinations, understand intakes, prepare documents and move toward international applications with a clearer plan.',
                'cta_label' => 'Explore Study Abroad',
                'cta_url' => '/study-abroad',
                'items' => [
                    'country_1_code' => 'UK',
                    'country_1_name' => 'United Kingdom',
                    'country_1_meta' => '40+ universities',
                    'country_2_code' => 'CA',
                    'country_2_name' => 'Canada',
                    'country_2_meta' => '35+ universities',
                    'country_3_code' => 'AU',
                    'country_3_name' => 'Australia',
                    'country_3_meta' => '30+ universities',
                ],
                'extra' => [
                    'badge' => 'Admissions support',
                    'footnote' => 'Counselling, admissions, visa support',
                ],
                'sort_order' => 30,
                'is_active' => true,
            ],
        );

        PageSection::updateOrCreate(
            ['page_slug' => 'home', 'section_key' => 'skills_focus'],
            [
                'name' => 'Homepage Skills Focus Section',
                'eyebrow' => 'Skills Focus',
                'subtitle' => 'Hands-on IT programs built around real projects, so students finish with a portfolio and skills employers actually ask for.',
                'title' => 'Practical programs for job-ready IT skills.',
                'body' => 'A focused training preview for students who want hands-on tech learning, portfolio work and marketable skills without searching through the whole site first.',
                'cta_label' => 'View Skill Programs',
                'cta_url' => '/skills',
                'items' => [
                    'course_1_title' => 'Full Stack Web Development',
                    'course_1_meta' => '6 months',
                    'course_2_title' => 'AI & Machine Learning',
                    'course_2_meta' => '4 months',
                    'course_3_title' => 'Data Science & Analytics',
                    'course_3_meta' => '5 months',
                ],
                'extra' => [
                    'badge' => 'Skills focus',
                    'footnote' => 'Local training, global confidence',
                ],
                'sort_order' => 31,
                'is_active' => true,
            ],
        );
    }
}
