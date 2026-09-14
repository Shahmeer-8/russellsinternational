<?php

namespace App\Filament\Pages;

use App\Filament\Resources\EventResource;
use App\Filament\Resources\HeroSlideResource;
use App\Filament\Resources\ServiceResource;
use App\Filament\Resources\StatResource;
use App\Filament\Resources\TestimonialResource;
use App\Filament\Resources\TickerItemResource;
use App\Filament\Resources\WhyChooseUsItemResource;

class HomePageContent extends WebsiteContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-home';

    protected static ?string $navigationLabel = 'Home Page';

    protected static ?string $title = 'Home Page';

    protected static ?string $slug = 'website/home-page';

    protected static ?int $navigationSort = 1;

    protected function contentGroups(): array
    {
        return [
            [
                'title' => 'Home page sections',
                'description' => 'These are the sections currently rendered on the public home page, in website order.',
                'sections' => [
                    $this->resourceList('Hero carousel', 'First screen slider: image, heading, description and buttons.', HeroSlideResource::class, 'Manage Slides'),
                    $this->resourceList('Announcement ticker', 'Moving announcement strip below the hero carousel.', TickerItemResource::class, 'Manage Ticker'),
                    $this->resourceList('Stats strip', 'The figures counted up below the hero — student numbers, success rates and the like.', StatResource::class, 'Manage Stats'),
                    $this->pageSection('Why choose us heading', 'Eyebrow, heading and intro above the benefit cards.', 'home', 'why_choose_us'),
                    $this->resourceList('Why choose us cards', 'Benefit cards below the homepage hero area.', WhyChooseUsItemResource::class, 'Manage Cards'),
                    $this->pageSection('Services heading', 'Eyebrow, heading and intro above the services cards.', 'home', 'services'),
                    $this->resourceList('Services cards', 'The services shown on the homepage, each with an image and its key benefits.', ServiceResource::class, 'Manage Services'),
                    $this->pageSection('Study Abroad section', 'Heading, intro, image, destination countries, CTA and badge for the homepage Study Abroad section.', 'home', 'study_abroad'),
                    $this->pageSection('Skills Focus section', 'Heading, intro, image, course highlights, CTA and badge for the homepage Skills Focus section.', 'home', 'skills_focus'),
                    $this->pageSection('News carousel heading', 'Eyebrow, heading and intro above the homepage news carousel.', 'home', 'news'),
                    $this->resourceList('Homepage news carousel', 'Featured events/news cards shown on the homepage.', EventResource::class, 'Manage Events'),
                    $this->pageSection('Testimonials heading', 'Eyebrow, heading and intro above the reviews.', 'home', 'testimonials'),
                    $this->resourceList('Testimonials', 'Student/client reviews shown on the homepage.', TestimonialResource::class, 'Manage Reviews'),
                    $this->pageSection('Contact section', 'Heading, intro and the choices in the "I\'m interested in…" dropdown (the interest_1, interest_2 … rows).', 'home', 'contact'),
                    $this->pageSection('Global CTA banner', 'Shared call-to-action banner shown on home and inner pages.', 'global', 'cta'),
                ],
            ],
        ];
    }
}
