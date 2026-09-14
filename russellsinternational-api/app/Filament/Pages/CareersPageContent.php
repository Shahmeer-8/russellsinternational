<?php

namespace App\Filament\Pages;

use App\Filament\Resources\CareerApplicationResource;
use App\Filament\Resources\InternshipRecordResource;
use App\Filament\Resources\InternshipResource;
use App\Filament\Resources\JobResource;

class CareersPageContent extends WebsiteContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Careers Page';

    protected static ?string $title = 'Careers Page';

    protected static ?string $slug = 'website/careers-page';

    protected static ?int $navigationSort = 6;

    protected function contentGroups(): array
    {
        return [
            [
                'title' => 'Careers page sections',
                'description' => 'Hero, jobs, internships and application submissions.',
                'sections' => [
                    $this->pageRecord('Page SEO and status', 'Page registry, active status and SEO metadata for Careers.', 'careers'),
                    $this->pageSection('Page hero', 'Top hero image, title, subtitle and eyebrow for Careers.', 'careers', 'hero'),
                    $this->pageSection('Jobs heading', 'Eyebrow, heading and intro above the open positions.', 'careers', 'jobs'),
                    $this->resourceList('Jobs', 'Open positions shown on the Careers page.', JobResource::class, 'Manage Jobs'),
                    $this->pageSection('Internships section intro', 'Eyebrow, heading and intro at the top of the whole internships section.', 'careers', 'internships'),
                    $this->pageSection('Paid internships heading', 'Sub-heading above the paid internships group.', 'careers', 'internships_paid'),
                    $this->pageSection('Summer programmes heading', 'Eyebrow, heading and intro above the summer internship programmes group.', 'careers', 'internships_summer'),
                    $this->resourceList('Internships', 'Internship cards shown on the Careers page. Each card belongs to one of the two groups above.', InternshipResource::class, 'Manage Internships'),
                    $this->pageSection('Internship record heading', 'Eyebrow, heading and intro above the past internship programmes.', 'careers', 'internship_record'),
                    $this->resourceList('Internship record', 'Completed internship programmes, participant numbers and achievements.', InternshipRecordResource::class, 'Manage Record'),
                    $this->pageSection('Application form heading', 'Eyebrow, heading and intro above the application form. The positions in its dropdown come from the jobs and internships above.', 'careers', 'apply'),
                    $this->resourceList('Career applications', 'Applications submitted from the public career form.', CareerApplicationResource::class, 'Review Applications'),
                    $this->pageSection('Global CTA banner', 'Shared call-to-action banner shown near the bottom.', 'global', 'cta'),
                ],
            ],
        ];
    }
}
