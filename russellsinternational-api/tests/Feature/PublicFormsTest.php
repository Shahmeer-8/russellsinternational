<?php

namespace Tests\Feature;

use App\Models\CareerApplication;
use App\Models\ContactSubmission;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PublicFormsTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_submission_creates_new_record_with_ip(): void
    {
        $this->postJson('/api/v1/contact', [
            'name' => 'Test User',
            'phone' => '+923001234567',
            'email' => 'test@example.com',
            'interest' => 'Study Abroad',
            'message' => 'Please contact me.',
        ])
            ->assertCreated()
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas(ContactSubmission::class, [
            'email' => 'test@example.com',
            'status' => 'new',
        ]);
    }

    public function test_contact_validation_returns_frontend_friendly_errors(): void
    {
        $this->postJson('/api/v1/contact', ['email' => 'not-an-email'])
            ->assertStatus(422)
            ->assertJsonPath('success', false)
            ->assertJsonStructure(['errors' => ['name', 'email']]);
    }

    public function test_contact_endpoint_is_rate_limited(): void
    {
        RateLimiter::clear('127.0.0.1');

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/contact', [
                'name' => "Rate Test {$i}",
                'email' => "rate{$i}@example.com",
            ])->assertCreated();
        }

        $this->postJson('/api/v1/contact', [
            'name' => 'Rate Test Blocked',
            'email' => 'blocked@example.com',
        ])->assertStatus(429);
    }

    public function test_career_application_accepts_optional_phone_cover_letter_and_cv(): void
    {
        $this->postJson('/api/v1/careers/apply', [
            'application_type' => 'internship',
            'position_title' => 'Internship General',
            'name' => 'Applicant',
            'email' => 'applicant@example.com',
        ])
            ->assertCreated()
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas(CareerApplication::class, [
            'application_type' => 'internship',
            'position_title' => 'Internship General',
            'email' => 'applicant@example.com',
            'status' => 'new',
        ]);
    }

    public function test_career_application_stores_valid_cv_and_rejects_unsafe_uploads(): void
    {
        Storage::fake('public');

        $this->post('/api/v1/careers/apply', [
            'application_type' => 'job',
            'position_title' => 'Web Developer',
            'name' => 'Applicant',
            'email' => 'cv@example.com',
            'cv' => UploadedFile::fake()->create('cv.pdf', 100, 'application/pdf'),
        ], ['Accept' => 'application/json'])
            ->assertCreated()
            ->assertJsonPath('success', true);

        $application = CareerApplication::where('email', 'cv@example.com')->firstOrFail();
        Storage::disk('public')->assertExists($application->cv_path);

        $this->post('/api/v1/careers/apply', [
            'application_type' => 'job',
            'position_title' => 'Web Developer',
            'name' => 'Unsafe Applicant',
            'email' => 'unsafe@example.com',
            'cv' => UploadedFile::fake()->create('shell.php', 10, 'application/x-php'),
        ], ['Accept' => 'application/json'])
            ->assertStatus(422)
            ->assertJsonPath('success', false);
    }
}
