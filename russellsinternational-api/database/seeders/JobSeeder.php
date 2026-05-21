<?php

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Full Stack Developer', 'company' => 'Partner Tech Firm',
                'location' => 'Islamabad', 'type' => 'Full-Time', 'salary' => 'PKR 80K–120K',
                'description' => 'Build and maintain web applications using React and Node.js.',
                'requirements' => ['2+ years experience', 'React & Node.js', 'REST APIs', 'Git & CI/CD'],
            ],
            [
                'title' => 'Digital Marketing Executive', 'company' => "Russell's International",
                'location' => 'Islamabad', 'type' => 'Full-Time', 'salary' => 'PKR 50K–70K',
                'description' => 'Plan and execute digital marketing campaigns across multiple channels.',
                'requirements' => ['1+ year experience', 'Google Ads certified', 'SEO/SEM', 'Analytics'],
            ],
            [
                'title' => 'IELTS Instructor', 'company' => "Russell's International",
                'location' => 'Islamabad', 'type' => 'Part-Time', 'salary' => 'PKR 40K–60K',
                'description' => 'Teach IELTS preparation classes and conduct mock tests.',
                'requirements' => ['IELTS Band 8+', 'Teaching experience', 'British Council trained preferred'],
            ],
            [
                'title' => 'Education Counselor', 'company' => "Russell's International",
                'location' => 'Islamabad / Remote', 'type' => 'Full-Time', 'salary' => 'PKR 45K–65K',
                'description' => 'Guide students through the study abroad application process.',
                'requirements' => ['Counseling experience', 'Knowledge of UK/Canada/AUS admissions', 'Excellent communication'],
            ],
        ];

        foreach ($jobs as $job) {
            Job::create(array_merge($job, ['is_active' => true]));
        }

        $internships = [
            [
                'title' => 'Frontend Development Intern', 'company' => "Russell's International",
                'location' => 'Islamabad', 'duration' => '3 Months', 'type' => 'Paid',
                'description' => 'Build real-world React applications and contribute to live projects.',
                'skills' => ['React', 'TypeScript', 'Tailwind CSS'],
                'gains' => ['Real-world project experience', 'Mentorship from industry experts', 'Portfolio-worthy work samples', 'Certificate of completion', 'Potential full-time offer'],
            ],
            [
                'title' => 'Digital Marketing Intern', 'company' => "Russell's International",
                'location' => 'Islamabad / Remote', 'duration' => '2 Months', 'type' => 'Paid',
                'description' => 'Run campaigns, manage social media, and learn SEO/SEM strategies.',
                'skills' => ['SEO', 'Google Ads', 'Social Media'],
                'gains' => ['Real-world project experience', 'Mentorship from industry experts', 'Portfolio-worthy work samples', 'Certificate of completion'],
            ],
            [
                'title' => 'Data Science Intern', 'company' => 'Partner Company',
                'location' => 'Islamabad', 'duration' => '3 Months', 'type' => 'Unpaid',
                'description' => 'Work with real datasets, build models, and present insights.',
                'skills' => ['Python', 'Pandas', 'Machine Learning'],
                'gains' => ['Real-world project experience', 'Mentorship from industry experts', 'Certificate of completion'],
            ],
            [
                'title' => 'UI/UX Design Intern', 'company' => "Russell's International",
                'location' => 'Remote', 'duration' => '2 Months', 'type' => 'Paid',
                'description' => 'Design user interfaces for education platforms and marketing materials.',
                'skills' => ['Figma', 'Prototyping', 'User Research'],
                'gains' => ['Real-world project experience', 'Portfolio-worthy work samples', 'Certificate of completion'],
            ],
        ];

        foreach ($internships as $internship) {
            Internship::create(array_merge($internship, ['is_active' => true]));
        }
    }
}
