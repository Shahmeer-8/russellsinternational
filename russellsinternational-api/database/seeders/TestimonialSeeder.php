<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $written = [
            [
                'name' => 'Ayesha Khan',
                'program' => 'Study Abroad – UK',
                'quote' => "Russell's International made my dream of studying in the UK a reality. Their guidance was phenomenal from application to visa approval.",
                'rating' => 5,
            ],
            [
                'name' => 'Omer Ali',
                'program' => 'Full Stack Development',
                'quote' => 'The web development course was incredibly hands-on. I landed a job within two months of completing the program. Highly recommended!',
                'rating' => 5,
            ],
            [
                'name' => 'Maria Santos',
                'program' => 'Study Abroad – Canada',
                'quote' => "I was overwhelmed by the university options, but the team helped me choose the perfect fit. Now I'm thriving at a top Canadian university.",
                'rating' => 5,
            ],
        ];

        $videos = [
            ['name' => 'Sara Ahmed',  'program' => 'MS in Germany',    'youtube_id' => 'aqz-KE-bpKQ'],
        ];

        foreach ($written as $i => $t) {
            Testimonial::create(array_merge($t, ['type' => 'written', 'sort_order' => $i + 1, 'is_active' => true]));
        }

        foreach ($videos as $i => $v) {
            Testimonial::create(array_merge($v, ['type' => 'video', 'sort_order' => $i + 1, 'is_active' => true]));
        }
    }
}
