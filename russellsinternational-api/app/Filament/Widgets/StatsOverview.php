<?php

namespace App\Filament\Widgets;

use App\Models\CareerApplication;
use App\Models\ContactSubmission;
use App\Models\Course;
use App\Models\Event;
use App\Models\Job;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    /**
     * Every figure below is a live count, but a dashboard left open all morning
     * showed whatever was true when it was opened — so a new enquiry arriving did
     * not appear until someone reloaded, which is what made the numbers look
     * hardcoded. Thirty seconds is frequent enough to notice and far too little
     * traffic to matter: six counts on one small table each.
     */
    protected static ?string $pollingInterval = '30s';

    protected function getStats(): array
    {
        return [
            Stat::make('New Contact Enquiries', ContactSubmission::where('status', 'new')->count())
                ->description('Awaiting response')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('danger'),

            Stat::make('New Job Applications', CareerApplication::where('status', 'new')->count())
                ->description('Awaiting review')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('warning'),

            Stat::make('Active Courses', Course::where('is_active', true)->count())
                ->description('Total published courses')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('success'),

            Stat::make('Active Jobs', Job::where('is_active', true)->count())
                ->description('Open positions')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('primary'),

            Stat::make('Upcoming Events', Event::where('is_active', true)->where('content_type', 'event')->count())
                ->description('Published events')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('info'),

            Stat::make('Total Enquiries', ContactSubmission::count())
                ->description('All time contact submissions')
                ->descriptionIcon('heroicon-m-inbox')
                ->color('gray'),
        ];
    }
}
