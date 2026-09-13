<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

/**
 * Roster carried over from the organisation's existing site
 * (russellsinternational.com/about-us).
 *
 * Names and roles are title-cased here rather than copied verbatim: the source
 * site renders staff cards in all-caps and suffixes trainer roles with "-RES",
 * which is styling and internal shorthand, not the person's actual title.
 *
 * Keyed on name so re-running never duplicates a person.
 */
class TeamMemberSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->members() as $index => $member) {
            TeamMember::updateOrCreate(
                ['name' => $member['name']],
                $member + ['sort_order' => $index + 1, 'is_active' => true],
            );
        }
    }

    /**
     * @return array<int, array<string, string|null>>
     */
    private function members(): array
    {
        return [
            [
                'name' => 'Faiz Rasul',
                'role' => 'Founder',
                'bio' => null,
                'image' => 'team/faiz-rasul.png',
            ],
            [
                'name' => 'Nisa Mirza',
                'role' => 'CEO',
                'bio' => null,
                'image' => 'team/nisa-mirza.png',
            ],
            [
                'name' => 'Shahid Minhas',
                'role' => 'Director: International Partnerships & Trainings',
                'bio' => null,
                'image' => 'team/shahid-minhas.png',
            ],
            [
                'name' => 'Sarah Rasul',
                'role' => 'Consultant',
                'bio' => null,
                'image' => 'team/sarah-rasul.webp',
            ],
            [
                'name' => 'Shamma Rasul',
                'role' => 'Coordinator',
                'bio' => null,
                'image' => 'team/shamma-rasul.png',
            ],

            // ── Advisory board ────────────────────────────────────────────
            [
                'name' => 'Dr. Zulfiqar Ahmad',
                'role' => 'Advisory Board',
                'bio' => 'Dr. Zulfiqar holds a Ph.D. in Soil Science from the University of Agriculture Faisalabad, focusing on using bacteria to clean soil pollutants. As an Assistant Professor at PMAS Arid Agriculture University Rawalpindi, he mentors students, secured research funding, and authored 40+ peer-reviewed articles. His expertise spans soil science, bioremediation, and molecular biology techniques.',
                'image' => 'team/zulfiqar-ahmad.jpg',
            ],
            [
                'name' => 'Dr. Noreen Zainab',
                'role' => 'Advisory Board',
                'bio' => 'Dr. Noreen Zainab, a Ph.D. graduate from NUST, Islamabad, specializes in Image Processing and Machine Learning/Deep Learning. Her research focuses on applying advanced technologies to agricultural science, particularly in plant disease detection. With extensive teaching experience and multiple awards, she excels in academia and research.',
                'image' => 'team/noreen-zainab.jpg',
            ],
            [
                'name' => 'Barrister Syed Sibt-e-Hassan',
                'role' => 'Advisory Board',
                'bio' => 'Syed Sibt-e-Hassan Gardezi, a seasoned advocate, specializes in legal compliance, corporate contracts, and litigation resolution. As Chief Law Officer at the Universal Service Fund, he oversees regulatory matters and introduced innovative contract and litigation management systems. His expertise spans policy analysis, interdepartmental coordination, and advisory roles for government agencies.',
                'image' => 'team/sibt-e-hassan.jpg',
            ],

            // ── Team ──────────────────────────────────────────────────────
            [
                'name' => 'Awais Rasul',
                'role' => 'Manager Facilitation',
                'bio' => 'He is responsible for overseeing hardware management and ensuring seamless facility operations. His role involves leading the facilitation team, maintaining vendor relationships, and implementing maintenance schedules to ensure the efficiency and functionality of the technical infrastructure.',
                'image' => 'team/awais-rasul.jpeg',
            ],
            [
                'name' => 'Aqsa Anwar',
                'role' => 'Admission Officer',
                'bio' => "She is a dedicated Admission Officer at Russell's International, bringing a strong academic background with a Master's degree in Economics and proficiency in IELTS. With a keen eye for detail and effective communication skills, she ensures smooth admissions processes and assists prospective students in navigating their educational journey with clarity and support.",
                'image' => 'team/aqsa-anwar.webp',
            ],
            [
                'name' => 'Shahzaib Shah',
                'role' => 'Web Developer',
                'bio' => 'Shahzaib Shah is a dedicated Web Developer at our firm, currently pursuing his Bachelor of Science in Computer Science. With a passion for technology and an ability for creating innovative web solutions, Shahzaib has quickly become an integral part of our team. His commitment to continuous learning and adaptation to new technologies makes him a valuable asset to the company.',
                'image' => 'team/shahzaib-shah.jpeg',
            ],
            [
                'name' => 'Shayan',
                'role' => 'Training Consultant',
                'bio' => 'Shayan has specialized in human resource management through bachelors, masters, and additional certifications. His expertise covers recruitment and selection, performance management, employee engagement, data analytics, and coaching and mentoring.',
                'image' => 'team/shayan.jpeg',
            ],
            [
                'name' => 'Tariq Naeem',
                'role' => 'Training Consultant',
                'bio' => 'He is an Assistant Professor in the Department of Computer Science at the Faculty of Computing & Artificial Intelligence, Air University, Islamabad. With over 7 years of experience in the field of computer science, Mr. Naeem has a deep understanding of artificial intelligence, machine learning and deep learning models, and is passionate about research and collaboration on funded projects.',
                'image' => 'team/tariq-naeem.jpeg',
            ],
            [
                'name' => 'Salman Tasneem',
                'role' => 'Training Consultant',
                'bio' => 'Employee Engagement and T&D Head, ICF PCC Coach and MS Project expert providing executive and life coaching. He has trained 6,000+ people and coached 70+ professionals. He holds an MSc in Engineering Business Management from the University of Warwick, UK, and an Executive MBA from Preston University, Islamabad.',
                'image' => 'team/salman-tasneem.jpeg',
            ],
            [
                'name' => 'Sana Tanveer',
                'role' => 'Training Consultant',
                'bio' => 'She has done a BS (Hons) specialized in Fashion & Textiles from the University of Punjab, and graphic designing from Hunerkada. She works as a freelancer with different international companies as a graphic designer.',
                'image' => 'team/sana-tanveer.jpeg',
            ],
            [
                'name' => 'Aisha Bilal',
                'role' => 'Communication Skills Trainer',
                'bio' => "She is a dedicated educator with seven years of experience in teaching and providing specialized training in various domains. Proficient in enhancing communication skills, website usability, and implementing advanced teaching methodologies, she holds a Master's in English Linguistics and is committed to nurturing student growth.",
                'image' => 'team/aisha-bilal.jpeg',
            ],
            [
                'name' => 'Memoona Raza',
                'role' => 'Training Consultant',
                'bio' => 'She is a trainer and entrepreneur with 5+ years of experience in online and offline marketing. Founder of Minapin, a digital strategy company, she has helped transform the digital presence of businesses, including those focused on web3 and AI. She holds a B.A. in Journalism and an M.A. in English from the University of Punjab.',
                'image' => 'team/memoona-raza.jpeg',
            ],
            [
                'name' => 'Adeel Noshahi',
                'role' => 'Training Consultant',
                'bio' => 'He is a passionate educator with industry experience across several software houses. A graduate engineer from UET Lahore, he started his career at Devsinc, then founded Webpluspy and Noshahi IT Center. He currently works as a project coordinator at Zilon International Inc. His diverse background equips him to teach web development across multiple programming languages.',
                'image' => 'team/adeel-noshahi.jpeg',
            ],
            [
                'name' => 'Sikander Nawaz',
                'role' => 'Tech Trainer',
                'bio' => "Sikander Nawaz is a Software Engineer and Tech Trainer with notable achievements, including winning first place at Harvard's CS50x Puzzle Day 2024 and being selected as a Section Leader at Stanford University's Code in Place. He offers volunteer teaching in Python and Data Structures at iCodeGuru and has participated in multiple international AI hackathons.",
                'image' => 'team/sikander-nawaz.jpeg',
            ],
            [
                'name' => 'Shah Meer',
                'role' => 'Tech Trainer',
                // The source site shows Sikander Nawaz's bio under this photo — an
                // error there. Left blank rather than attributing the wrong text.
                'bio' => null,
                'image' => 'team/shah-meer.jpeg',
            ],
        ];
    }
}
