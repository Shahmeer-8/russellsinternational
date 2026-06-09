<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\HeroSlide;
use App\Models\Job;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Setting;
use App\Support\Media;
use Database\Seeders\HomePageSectionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_active_collections_hide_inactive_records_and_sort_by_sort_order(): void
    {
        HeroSlide::create($this->heroSlideAttributes(['title' => 'Second', 'sort_order' => 20, 'is_active' => true]));
        HeroSlide::create($this->heroSlideAttributes(['title' => 'Hidden', 'sort_order' => 1, 'is_active' => false]));
        HeroSlide::create($this->heroSlideAttributes(['title' => 'First', 'sort_order' => 10, 'is_active' => true]));

        $this->getJson('/api/v1/hero-slides')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.0.title', 'First')
            ->assertJsonPath('data.1.title', 'Second')
            ->assertJsonMissing(['title' => 'Hidden']);
    }

    public function test_detail_endpoints_return_json_404_for_inactive_or_missing_records(): void
    {
        $course = Course::create([
            'type' => 'paid',
            'title' => 'Inactive Course',
            'duration' => '1 month',
            'students_count' => '0',
            'is_active' => false,
        ]);

        $this->getJson("/api/v1/courses/{$course->id}")
            ->assertNotFound()
            ->assertJsonPath('success', false);

        $this->getJson('/api/v1/courses/999999')
            ->assertNotFound()
            ->assertJsonPath('success', false);
    }

    public function test_jobs_support_type_search_and_pagination_shape(): void
    {
        Job::create(['title' => 'Laravel Engineer', 'company' => 'Russell', 'location' => 'Remote', 'type' => 'Full-Time', 'description' => 'Build APIs', 'is_active' => true]);
        Job::create(['title' => 'Hidden Engineer', 'company' => 'Russell', 'location' => 'Remote', 'type' => 'Full-Time', 'description' => 'Hidden', 'is_active' => false]);
        Job::create(['title' => 'Designer', 'company' => 'Studio', 'location' => 'Remote', 'type' => 'Part-Time', 'description' => 'Design', 'is_active' => true]);

        $this->getJson('/api/v1/jobs?type=Full-Time&search=Laravel&per_page=1')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.data.0.title', 'Laravel Engineer')
            ->assertJsonPath('data.per_page', 1)
            ->assertJsonMissing(['title' => 'Hidden Engineer']);
    }

    public function test_settings_group_and_key_lookup(): void
    {
        Setting::create(['group' => 'contact', 'key' => 'phone', 'label' => 'Phone', 'value' => '+92 300 0000000', 'type' => 'text']);
        Setting::create(['group' => 'seo', 'key' => 'site_name', 'label' => 'Site Name', 'value' => 'Russell', 'type' => 'text']);

        $this->getJson('/api/v1/settings?group=contact')
            ->assertOk()
            ->assertJsonPath('data.phone', '+92 300 0000000')
            ->assertJsonMissing(['site_name' => 'Russell']);

        $this->getJson('/api/v1/settings/phone')
            ->assertOk()
            ->assertJsonPath('data.key', 'phone');
    }

    public function test_page_sections_are_keyed_and_active_only(): void
    {
        Page::create(['slug' => 'about', 'name' => 'About', 'is_active' => true]);
        PageSection::create(['page_slug' => 'about', 'section_key' => 'hero', 'name' => 'Hero', 'title' => 'About Us', 'sort_order' => 1, 'is_active' => true]);
        PageSection::create(['page_slug' => 'about', 'section_key' => 'draft', 'name' => 'Draft', 'title' => 'Draft', 'sort_order' => 2, 'is_active' => false]);

        $this->getJson('/api/v1/pages/about/sections')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.hero.title', 'About Us')
            ->assertJsonMissing(['title' => 'Draft']);
    }

    public function test_home_dual_focus_sections_are_seeded_for_admin_and_public_api(): void
    {
        $this->seed(HomePageSectionSeeder::class);

        $this->assertDatabaseHas('page_sections', [
            'page_slug' => 'home',
            'section_key' => 'dual_focus',
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('page_sections', [
            'page_slug' => 'home',
            'section_key' => 'dual_focus_study',
            'cta_url' => '/study-abroad',
            'is_active' => true,
        ]);

        $this->assertDatabaseHas('page_sections', [
            'page_slug' => 'home',
            'section_key' => 'dual_focus_skills',
            'cta_url' => '/skills',
            'is_active' => true,
        ]);

        $this->getJson('/api/v1/pages/home/sections')
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.dual_focus.title', 'Pick the pathway that fits your next move.')
            ->assertJsonPath('data.dual_focus_study.items.country_1_name', 'United Kingdom')
            ->assertJsonPath('data.dual_focus_skills.items.course_1_title', 'Full Stack Web Development');
    }

    public function test_media_url_normalizes_external_storage_and_plain_paths(): void
    {
        config(['app.url' => 'http://localhost:8000']);

        $this->assertSame('https://cdn.example.com/file.pdf', Media::url('https://cdn.example.com/file.pdf'));
        $this->assertSame('http://localhost:8000/storage/courses/file.pdf', Media::url('storage/courses/file.pdf'));
        $this->assertSame('http://localhost:8000/storage/courses/file.pdf', Media::url('courses/file.pdf'));
    }

    private function heroSlideAttributes(array $overrides = []): array
    {
        return array_merge([
            'eyebrow' => 'Study',
            'title' => 'Slide',
            'description' => 'Slide description',
            'cta_label' => 'Start',
            'cta_url' => '/#contact',
            'sort_order' => 0,
            'is_active' => true,
        ], $overrides);
    }
}
