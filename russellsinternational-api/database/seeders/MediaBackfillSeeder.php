<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\GalleryPhoto;
use App\Models\HeroSlide;
use App\Models\Internship;
use App\Models\PageSection;
use App\Models\StudyDestination;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class MediaBackfillSeeder extends Seeder
{
    public function run(): void
    {
        HeroSlide::where('id', 1)->update(['image' => 'hero-slides/hero-students-clean.jpg']);
        HeroSlide::where('id', 2)->update(['image' => 'hero-slides/study-abroad-clean.jpg']);
        HeroSlide::where('id', 3)->update(['image' => 'hero-slides/skill-training.jpg']);

        foreach ([
            1 => 'gallery/gallery-campus.jpg',
            2 => 'gallery/gallery-lab.jpg',
            3 => 'gallery/gallery-graduation.jpg',
            4 => 'gallery/event-workshop.jpg',
            5 => 'gallery/event-seminar.jpg',
            6 => 'gallery/about-team.jpg',
        ] as $id => $image) {
            GalleryPhoto::where('id', $id)->update(['image' => $image]);
        }

        Event::where('tag', 'Admissions')->update(['image' => 'events/event-admissions.jpg']);
        Event::where('tag', 'Workshop')->update(['image' => 'events/event-workshop.jpg']);
        Event::where('tag', 'Seminar')->update(['image' => 'events/event-seminar.jpg']);

        StudyDestination::where('country', 'United Kingdom')->update(['image' => 'destinations/united-kingdom.jpg']);
        StudyDestination::where('country', 'Canada')->update(['image' => 'destinations/canada.jpg']);
        StudyDestination::where('country', 'Australia')->update(['image' => 'destinations/australia.jpg']);
        StudyDestination::where('country', 'United States')->update(['image' => 'destinations/united-states.jpg']);

        Internship::whereNull('image')->update(['image' => 'internships/internship.jpg']);

        Testimonial::where('name', 'Ayesha Khan')->update(['image' => 'testimonials/student-ayesha.jpg']);
        Testimonial::where('name', 'Omer Ali')->update(['image' => 'testimonials/student-omer.jpg']);
        Testimonial::where('name', 'Maria Santos')->update(['image' => 'testimonials/student-maria.jpg']);

        foreach ($this->heroSections() as $section) {
            PageSection::updateOrCreate(
                ['page_slug' => $section['page_slug'], 'section_key' => 'hero'],
                $section + ['section_key' => 'hero', 'sort_order' => 0, 'is_active' => true],
            );
        }

        PageSection::updateOrCreate(
            ['page_slug' => 'about', 'section_key' => 'campus_life'],
            [
                'name' => 'Campus Life',
                'eyebrow' => 'Campus Life',
                'title' => 'A Living, Learning Ecosystem',
                'body' => 'A modern learning environment with training labs, counseling spaces, and student support facilities.',
                'image' => 'page-sections/campus-life.jpg',
                'cta_label' => 'Contact Us',
                'cta_url' => '/#contact',
                'sort_order' => 1,
                'is_active' => true,
            ],
        );

        PageSection::updateOrCreate(
            ['page_slug' => 'about', 'section_key' => 'founder_message'],
            [
                'name' => 'Founder Message',
                'eyebrow' => 'Founder Message',
                'title' => 'Dear Students, Parents and Well-Wishers',
                'body' => 'Together, we shape brighter futures through education, skills, and global opportunity.',
                'image' => 'page-sections/founder-portrait.jpg',
                'sort_order' => 2,
                'is_active' => true,
            ],
        );

        PageSection::updateOrCreate(
            ['page_slug' => 'about', 'section_key' => 'foundation'],
            [
                'name' => 'Foundation',
                'eyebrow' => 'What Drives Us',
                'title' => 'Our Foundation',
                'items' => [
                    'Mission' => 'To deliver skill-based programs that prepare students for global success.',
                    'Vision' => 'To create a learning climate where students become productive and socially conscious.',
                    'Core Values' => 'Commitment, accessibility, and excellence in every learning journey.',
                ],
                'sort_order' => 3,
                'is_active' => true,
            ],
        );
    }

    private function heroSections(): array
    {
        return [
            [
                'page_slug' => 'about',
                'name' => 'About Hero',
                'eyebrow' => 'About Us',
                'title' => 'Change Begins With One Dream',
                'subtitle' => 'A premier education consultancy and IT training institute bridging ambition with global opportunity.',
                'image' => 'page-sections/about-hero.jpg',
            ],
            [
                'page_slug' => 'skills',
                'name' => 'Skills Hero',
                'eyebrow' => 'Skills & Courses',
                'title' => 'Industry-Ready IT & Tech Training',
                'subtitle' => 'Premium programs and NAVTTC government-funded courses designed to make you job-ready.',
                'image' => 'hero-slides/skill-training.jpg',
            ],
            [
                'page_slug' => 'study-abroad',
                'name' => 'Study Abroad Hero',
                'eyebrow' => 'Study Abroad',
                'title' => 'Your Pathway to Global Universities',
                'subtitle' => 'End-to-end admissions and visa support for global universities.',
                'image' => 'page-sections/study-abroad-hero.jpg',
            ],
            [
                'page_slug' => 'languages',
                'name' => 'Languages Hero',
                'eyebrow' => 'Language Programs',
                'title' => 'Master a New Language. Unlock the World.',
                'subtitle' => 'IELTS, German, and Korean taught by certified instructors.',
                'image' => 'page-sections/languages-hero.jpg',
            ],
            [
                'page_slug' => 'careers',
                'name' => 'Careers Hero',
                'eyebrow' => 'Careers',
                'title' => 'Jobs, Internships & Career Growth',
                'subtitle' => 'Discover open positions and structured internships to launch your career.',
                'image' => 'page-sections/jobs-career.jpg',
            ],
            [
                'page_slug' => 'events',
                'name' => 'Events Hero',
                'eyebrow' => 'Events, News & Gallery',
                'title' => 'What Is Happening at Russell International',
                'subtitle' => 'Workshops, seminars, admissions briefings and community moments.',
                'image' => 'page-sections/events-hero.jpg',
            ],
        ];
    }
}
