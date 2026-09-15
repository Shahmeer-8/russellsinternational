<?php

namespace App\Filament\Pages;

class LegalPagesContent extends WebsiteContentPage
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'Legal & Ausbildung';

    protected static ?string $title = 'Legal & Ausbildung Pages';

    protected static ?string $slug = 'website/legal-pages';

    // After the main pages, before the header and footer screens.
    protected static ?int $navigationSort = 75;

    protected function contentGroups(): array
    {
        return [
            [
                'title' => 'Legal pages',
                'description' => 'The Privacy Policy and Terms of Service the footer links to. Each document is one text box: start a line with "## " to make it a heading, or with "- " to make it a bullet.',
                'sections' => [
                    $this->pageSection('Privacy Policy', 'Heading, intro and the full text of the privacy policy.', 'privacy', 'document'),
                    $this->pageSection('Terms of Service', 'Heading, intro and the full text of the terms of service.', 'terms', 'document'),
                ],
            ],
            [
                'title' => 'Ausbildung page',
                'description' => 'The German vocational training page linked from the Study Abroad menu in the header.',
                'sections' => [
                    $this->pageSection('Page hero', 'Top hero image, title, subtitle and eyebrow for Ausbildung.', 'ausbildung', 'hero'),
                    $this->pageSection('Page content', 'The body of the page. Same formatting as the legal pages: "## " for a heading, "- " for a bullet.', 'ausbildung', 'overview'),
                    $this->pageSection('Global CTA banner', 'Shared call-to-action banner shown near the bottom.', 'global', 'cta'),
                ],
            ],
        ];
    }
}
