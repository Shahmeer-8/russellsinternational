<?php

namespace Database\Seeders;

use App\Models\NavigationItem;
use Illuminate\Database\Seeder;

class NavigationItemSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->items() as $item) {
            NavigationItem::updateOrCreate(
                ['location' => $item['location'], 'label' => $item['label'], 'url' => $item['url']],
                $item,
            );
        }
    }

    private function items(): array
    {
        return [
            ['location' => 'header', 'label' => 'Home', 'url' => '/', 'sort_order' => 1, 'is_active' => true],
            ['location' => 'header', 'label' => 'About Us', 'url' => '/about', 'sort_order' => 2, 'is_active' => true],
            ['location' => 'header', 'label' => 'Skills', 'url' => '/skills', 'badge_label' => 'New', 'badge_variant' => 'accent', 'badge_animation' => 'pulse', 'sort_order' => 3, 'is_active' => true],
            ['location' => 'header', 'label' => 'Study Abroad', 'url' => '/study-abroad', 'sort_order' => 4, 'is_active' => true],
            ['location' => 'header', 'label' => 'Languages', 'url' => '/languages', 'sort_order' => 5, 'is_active' => true],
            ['location' => 'header', 'label' => 'Careers', 'url' => '/careers', 'sort_order' => 6, 'is_active' => true],
            ['location' => 'header', 'label' => 'Events', 'url' => '/events', 'sort_order' => 7, 'is_active' => true],

            ['location' => 'footer', 'footer_column' => 'Quick Links', 'label' => 'Home', 'url' => '/', 'sort_order' => 1, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'Quick Links', 'label' => 'About Us', 'url' => '/about', 'sort_order' => 2, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'Quick Links', 'label' => 'Skills', 'url' => '/skills', 'sort_order' => 3, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'Quick Links', 'label' => 'Contact', 'url' => '/#contact', 'sort_order' => 4, 'is_active' => true],

            ['location' => 'footer', 'footer_column' => 'Programs', 'label' => 'Web Development', 'url' => '/skills', 'sort_order' => 1, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'Programs', 'label' => 'AI & ML', 'url' => '/skills', 'sort_order' => 2, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'Programs', 'label' => 'Languages', 'url' => '/languages', 'sort_order' => 3, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'Programs', 'label' => 'NAVTTC (Free)', 'url' => '/skills', 'badge_label' => 'Free', 'badge_variant' => 'success', 'badge_animation' => 'blink', 'sort_order' => 4, 'is_active' => true],

            ['location' => 'footer', 'footer_column' => 'More', 'label' => 'Careers', 'url' => '/careers', 'sort_order' => 1, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'More', 'label' => 'Events & News', 'url' => '/events', 'sort_order' => 2, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'More', 'label' => 'Gallery', 'url' => '/events', 'sort_order' => 3, 'is_active' => true],
            ['location' => 'footer', 'footer_column' => 'More', 'label' => 'Study Abroad', 'url' => '/study-abroad', 'sort_order' => 4, 'is_active' => true],
        ];
    }
}
