<?php

namespace Database\Seeders;

use App\Models\LanguageProgram;
use Illuminate\Database\Seeder;

class LanguageProgramSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            ['flag_emoji' => 'GB', 'language_code' => 'english', 'title' => 'IELTS Preparation', 'duration' => '8 Weeks', 'badge' => 'Most Popular', 'description' => 'Complete coaching for listening, reading, writing and speaking with weekly mock tests.', 'color_class' => 'bg-blue-50 text-blue-600', 'benefits' => ['Band score strategy', 'Writing task feedback', 'Speaking interview practice', 'Full-length mock exams']],
            ['flag_emoji' => 'GB', 'language_code' => 'english', 'title' => 'PTE Academic', 'duration' => '6 Weeks', 'badge' => 'Fast Track', 'description' => 'Computer-based practice focused on scoring patterns, fluency, pronunciation and time control.', 'color_class' => 'bg-cyan-50 text-cyan-600', 'benefits' => ['AI-scored practice', 'Template drills', 'Speaking fluency sessions', 'Target-score roadmap']],
            ['flag_emoji' => 'GB', 'language_code' => 'english', 'title' => 'LanguageCert', 'duration' => '6 Weeks', 'badge' => 'Visa Ready', 'description' => 'Preparation for LanguageCert ESOL and SELT-style assessment routes.', 'color_class' => 'bg-indigo-50 text-indigo-600', 'benefits' => ['Exam format training', 'Grammar refreshers', 'Writing correction', 'Interview-style speaking']],
            ['flag_emoji' => 'DE', 'language_code' => 'german', 'title' => 'Goethe A1-B2', 'duration' => '12 Weeks per level', 'badge' => 'Visa Ready', 'description' => 'Goethe-aligned German classes for study, Ausbildung, family reunion and work pathways.', 'color_class' => 'bg-amber-50 text-amber-600', 'benefits' => ['A1 to B2 levels', 'Grammar and vocabulary labs', 'Model papers', 'Conversation practice']],
            ['flag_emoji' => 'DE', 'language_code' => 'german', 'title' => 'TestDaF Preparation', 'duration' => '8 Weeks', 'badge' => 'University Track', 'description' => 'Academic German preparation for students targeting German university admission.', 'color_class' => 'bg-red-50 text-red-600', 'benefits' => ['Reading and listening drills', 'Academic writing', 'Speaking simulations', 'Timed practice tests']],
            ['flag_emoji' => 'DE', 'language_code' => 'german', 'title' => 'telc German', 'duration' => '8 Weeks', 'badge' => 'Exam Ready', 'description' => 'Structured telc preparation for everyday, professional and visa-focused German exams.', 'color_class' => 'bg-yellow-50 text-yellow-700', 'benefits' => ['Exam sections breakdown', 'Writing samples', 'Pair speaking practice', 'Level assessment']],
            ['flag_emoji' => 'KR', 'language_code' => 'korean', 'title' => 'TOPIK Preparation', 'duration' => '10 Weeks', 'badge' => 'Study Track', 'description' => 'From Hangul foundations to TOPIK I and II preparation for Korean study pathways.', 'color_class' => 'bg-rose-50 text-rose-600', 'benefits' => ['Hangul mastery', 'Vocabulary sets', 'Reading practice', 'Mock TOPIK papers']],
            ['flag_emoji' => 'KR', 'language_code' => 'korean', 'title' => 'EPS-TOPIK', 'duration' => '8 Weeks', 'badge' => 'EPS Ready', 'description' => 'Work-route Korean preparation with practical vocabulary and EPS-style question practice.', 'color_class' => 'bg-emerald-50 text-emerald-600', 'benefits' => ['Workplace vocabulary', 'Listening drills', 'EPS model tests', 'Application guidance']],
        ];

        foreach ($languages as $i => $language) {
            LanguageProgram::updateOrCreate(
                ['title' => $language['title']],
                array_merge($language, ['sort_order' => $i + 1, 'is_active' => true]),
            );
        }
    }
}
