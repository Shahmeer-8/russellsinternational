<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class FooterSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'site_name',
                'value' => "Russell's International",
                'type' => 'text',
                'group' => 'general',
                'label' => 'Site Name',
            ],
            [
                'key' => 'footer_text',
                'value' => 'Empowering students with global education opportunities and industry-ready IT skills since 2014.',
                'type' => 'textarea',
                'group' => 'footer',
                'label' => 'Footer Text',
            ],
            [
                'key' => 'copyright_text',
                'value' => "© 2026 Russell's International. All rights reserved.",
                'type' => 'text',
                'group' => 'footer',
                'label' => 'Copyright Text',
            ],
            [
                'key' => 'privacy_url',
                'value' => '#',
                'type' => 'url',
                'group' => 'footer',
                'label' => 'Privacy Policy URL',
            ],
            [
                'key' => 'terms_url',
                'value' => '#',
                'type' => 'url',
                'group' => 'footer',
                'label' => 'Terms of Service URL',
            ],
            [
                'key' => 'map_iframe_url',
                'value' => Setting::get('google_map', 'https://www.google.com/maps?q=Islamabad,Pakistan&output=embed'),
                'type' => 'url',
                'group' => 'contact',
                'label' => 'Map Iframe URL',
            ],
            [
                'key' => 'facebook_url',
                'value' => Setting::get('facebook', 'https://facebook.com/'),
                'type' => 'url',
                'group' => 'social',
                'label' => 'Facebook URL',
            ],
            [
                'key' => 'instagram_url',
                'value' => Setting::get('instagram', 'https://instagram.com/'),
                'type' => 'url',
                'group' => 'social',
                'label' => 'Instagram URL',
            ],
            [
                'key' => 'linkedin_url',
                'value' => Setting::get('linkedin', 'https://linkedin.com/'),
                'type' => 'url',
                'group' => 'social',
                'label' => 'LinkedIn URL',
            ],
            [
                'key' => 'youtube_url',
                'value' => Setting::get('youtube', 'https://youtube.com/'),
                'type' => 'url',
                'group' => 'social',
                'label' => 'YouTube URL',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting,
            );
        }
    }
}
