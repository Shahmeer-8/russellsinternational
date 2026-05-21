<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\GalleryPhoto;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'content_type' => 'event',
                'tag' => 'Workshop',
                'tag_color' => 'bg-blue-50 text-blue-700',
                'title' => 'AI & Machine Learning Hands-On Workshop',
                'event_date' => '2026-04-25',
                'short_description' => 'Join our free 2-hour workshop and explore the fundamentals of AI with real-world projects.',
                'full_details' => 'This workshop covers neural networks, supervised learning, and hands-on model building with Python and TensorFlow. Open to all skill levels.',
            ],
            [
                'content_type' => 'event',
                'tag' => 'Seminar',
                'tag_color' => 'bg-purple-50 text-purple-700',
                'title' => 'Study in UK – September 2026 Intake Briefing',
                'event_date' => '2026-05-03',
                'short_description' => 'Learn about top UK universities, scholarships, and the complete application process.',
                'full_details' => 'Meet university representatives, learn about scholarship opportunities, and get one-on-one counseling. Refreshments provided.',
            ],
            [
                'content_type' => 'event',
                'tag' => 'Admissions',
                'tag_color' => 'bg-green-50 text-green-700',
                'title' => 'Open Day – Campus Tour & Free Counseling',
                'event_date' => '2026-05-10',
                'short_description' => 'Visit our campus, meet trainers, and get free career counseling for IT and study abroad.',
                'full_details' => 'Tour our state-of-the-art labs, meet expert trainers, and receive personalized career guidance. Families welcome.',
            ],
        ];

        foreach ($events as $event) {
            Event::create(array_merge($event, ['is_active' => true]));
        }

        $categories = ['Campus', 'Training', 'Events', 'Workshop', 'Seminar', 'Team'];
        $alts = [
            'Modern campus building',
            'Students in IT training lab',
            'Graduation ceremony celebration',
            'AI workshop in progress',
            'Study abroad seminar',
            'Team meeting and collaboration',
        ];

        foreach ($categories as $i => $category) {
            GalleryPhoto::create([
                'image' => 'gallery/placeholder.jpg',
                'alt_text' => $alts[$i],
                'category' => $category,
                'sort_order' => $i + 1,
                'is_active' => true,
            ]);
        }
    }
}
