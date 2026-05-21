<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $paid = [
            ['icon_name' => 'Code',       'title' => 'Full Stack Web Development', 'duration' => '6 Months', 'students_count' => '450+', 'tag' => 'Bestseller', 'price' => 'PKR 45,000', 'color_class' => 'bg-blue-50 text-blue-600'],
            ['icon_name' => 'Brain',      'title' => 'AI & Machine Learning',       'duration' => '4 Months', 'students_count' => '320+', 'tag' => 'New',        'price' => 'PKR 55,000', 'color_class' => 'bg-purple-50 text-purple-600'],
            ['icon_name' => 'TrendingUp', 'title' => 'Digital Marketing & SEO',     'duration' => '3 Months', 'students_count' => '580+', 'tag' => null,          'price' => 'PKR 30,000', 'color_class' => 'bg-green-50 text-green-600'],
            ['icon_name' => 'Shield',     'title' => 'Cybersecurity Essentials',    'duration' => '5 Months', 'students_count' => '210+', 'tag' => null,          'price' => 'PKR 50,000', 'color_class' => 'bg-red-50 text-red-600'],
            ['icon_name' => 'Palette',    'title' => 'UI/UX Design Mastery',        'duration' => '4 Months', 'students_count' => '390+', 'tag' => 'Popular',     'price' => 'PKR 35,000', 'color_class' => 'bg-pink-50 text-pink-600'],
            ['icon_name' => 'Server',     'title' => 'Cloud & DevOps',              'duration' => '5 Months', 'students_count' => '270+', 'tag' => null,          'price' => 'PKR 48,000', 'color_class' => 'bg-indigo-50 text-indigo-600'],
        ];

        $navttc = [
            ['icon_name' => 'Code',       'title' => 'Web Development Fundamentals', 'duration' => '3 Months', 'students_count' => '800+',   'tag' => 'NAVTTC', 'price' => null, 'color_class' => 'bg-emerald-50 text-emerald-600'],
            ['icon_name' => 'Brain',      'title' => 'Python Programming',            'duration' => '3 Months', 'students_count' => '650+',   'tag' => 'NAVTTC', 'price' => null, 'color_class' => 'bg-teal-50 text-teal-600'],
            ['icon_name' => 'TrendingUp', 'title' => 'E-Commerce & Freelancing',      'duration' => '2 Months', 'students_count' => '1,200+', 'tag' => 'NAVTTC', 'price' => null, 'color_class' => 'bg-cyan-50 text-cyan-600'],
        ];

        $defaults = [
            'what_you_learn' => ['Industry-standard tools and frameworks', 'Real-world project-based learning', 'Portfolio development and career prep', 'Certification upon completion'],
            'highlights' => ['Expert Trainers', 'Hands-On Labs', 'Job Placement', 'Flexible Schedule'],
            'is_active' => true,
        ];

        $sort = 1;
        foreach ($paid as $course) {
            Course::create(array_merge($defaults, $course, ['type' => 'paid', 'sort_order' => $sort++]));
        }

        $sort = 1;
        foreach ($navttc as $course) {
            Course::create(array_merge($defaults, $course, ['type' => 'navttc', 'sort_order' => $sort++]));
        }
    }
}
