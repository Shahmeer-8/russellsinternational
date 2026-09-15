<?php

namespace Database\Seeders;

use App\Models\NavigationItem;
use App\Models\PageSection;
use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * The data half of the client's September 2026 review.
 *
 * Several of the reported faults were not bugs in the site's code at all — they
 * were duplicate or placeholder rows that the code was faithfully rendering. Those
 * are corrected here; the rest of that review is in the components.
 *
 * Safe to re-run: every write either targets a row this seeder created, or is
 * guarded so wording the owner has since edited in the panel is left alone.
 */
class ClientFeedbackSeeder extends Seeder
{
    public function run(): void
    {
        $this->removeDuplicateSocialSettings();
        $this->pointLegalLinksAtTheNewPages();
        $this->fixNavttcFooterLabel();
        $this->buildStudyAbroadMenu();
        $this->seedLegalPages();
        $this->seedAusbildungPage();
        $this->seedNavttcWarning();
    }

    /**
     * Every social network had two settings rows — `facebook` and `facebook_url`
     * — and the footer read the `_url` one, which held a placeholder. The owner
     * corrected the real link over and over and the site never changed.
     *
     * The real values live in the unsuffixed keys, so the duplicates go. Where a
     * duplicate holds something real and its counterpart does not, the real value
     * is carried across first rather than thrown away.
     */
    private function removeDuplicateSocialSettings(): void
    {
        $placeholders = [
            'https://facebook.com/',
            'https://instagram.com/',
            'https://linkedin.com/',
            'https://youtube.com/',
        ];

        foreach (['facebook', 'instagram', 'linkedin', 'youtube'] as $network) {
            $duplicate = Setting::query()->where('key', "{$network}_url")->first();

            if (! $duplicate) {
                continue;
            }

            $canonical = Setting::query()->where('key', $network)->first();
            $duplicateIsReal = filled($duplicate->value) && ! in_array($duplicate->value, $placeholders, true);
            $canonicalIsReal = $canonical && filled($canonical->value) && ! in_array($canonical->value, $placeholders, true);

            if ($duplicateIsReal && ! $canonicalIsReal) {
                Setting::query()->updateOrCreate(
                    ['key' => $network],
                    ['value' => $duplicate->value] + $this->socialDefaults($network),
                );
            }

            $duplicate->delete();
        }

        // Same story for the map: an embed URL nobody could regenerate sat in
        // `map_iframe_url` and won over the ordinary Google Maps link in
        // `google_map`. The footer now converts an ordinary link into an embed, so
        // the one the owner can actually produce is the one that is kept.
        Setting::query()->where('key', 'map_iframe_url')->delete();

        Setting::query()->where('key', 'google_map')->update([
            'label' => 'Google Maps link',
            'description' => 'Open your location in Google Maps and paste the address bar URL here.',
        ]);
    }

    private function pointLegalLinksAtTheNewPages(): void
    {
        // Both were "#", so the footer links rendered and went nowhere.
        foreach (['privacy_url' => '/privacy-policy', 'terms_url' => '/terms-of-service'] as $key => $path) {
            $setting = Setting::query()->where('key', $key)->first();

            if ($setting && (blank($setting->value) || $setting->value === '#')) {
                $setting->update(['value' => $path]);
            }
        }
    }

    /**
     * The footer link read "NAVTTC (Free)" and carried a "Free" badge beside it,
     * so the word appeared twice. The badge is the one to keep — it is the part
     * that draws the eye.
     */
    private function fixNavttcFooterLabel(): void
    {
        NavigationItem::query()
            ->where('location', 'footer')
            ->where('label', 'NAVTTC (Free)')
            ->update(['label' => 'NAVTTC']);
    }

    /**
     * Groups the three pathways under one header menu. The parent keeps its own
     * URL, and that destination is repeated as the first entry in the dropdown so
     * it stays reachable — the parent itself only opens the menu.
     */
    private function buildStudyAbroadMenu(): void
    {
        $parent = NavigationItem::query()
            ->where('location', 'header')
            ->where('url', '/study-abroad')
            ->whereNull('parent_id')
            ->first();

        if (! $parent) {
            return;
        }

        $children = [
            ['label' => 'Study Abroad', 'url' => '/study-abroad', 'sort_order' => 1],
            ['label' => 'Languages', 'url' => '/languages', 'sort_order' => 2],
            ['label' => 'Ausbildung', 'url' => '/ausbildung', 'sort_order' => 3],
        ];

        foreach ($children as $child) {
            NavigationItem::query()->updateOrCreate(
                ['location' => 'header', 'parent_id' => $parent->id, 'url' => $child['url']],
                $child + ['location' => 'header', 'parent_id' => $parent->id, 'target' => '_self', 'is_active' => true],
            );
        }

        // Languages used to sit beside Study Abroad in the bar. It is inside the
        // menu now, so the top-level copy would be a duplicate.
        NavigationItem::query()
            ->where('location', 'header')
            ->whereNull('parent_id')
            ->where('url', '/languages')
            ->delete();
    }

    /**
     * The footer has always linked to a privacy policy and terms of service. The
     * pages did not exist. The text seeded here matches the frontend fallback in
     * src/pages/legalContent.ts byte for byte, so seeding changes nothing on
     * screen — it only puts the documents where the owner can revise them.
     */
    private function seedLegalPages(): void
    {
        foreach ($this->legalDocuments() as $document) {
            PageSection::query()->firstOrCreate(
                ['page_slug' => $document['page_slug'], 'section_key' => 'document'],
                [
                    'name' => $document['name'],
                    'eyebrow' => $document['eyebrow'],
                    'title' => $document['title'],
                    'subtitle' => $document['subtitle'],
                    'body' => $document['body'],
                    'sort_order' => 0,
                    'is_active' => true,
                ],
            );
        }
    }

    private function seedAusbildungPage(): void
    {
        PageSection::query()->firstOrCreate(
            ['page_slug' => 'ausbildung', 'section_key' => 'hero'],
            [
                'name' => 'Ausbildung — Page hero',
                'eyebrow' => 'Germany',
                'title' => 'Ausbildung: Train and Earn in Germany',
                'subtitle' => "Germany's dual vocational training system combines paid work at a company with classroom study, and finishes with a recognised qualification.",
                'sort_order' => 0,
                'is_active' => true,
            ],
        );

        PageSection::query()->firstOrCreate(
            ['page_slug' => 'ausbildung', 'section_key' => 'overview'],
            [
                'name' => 'Ausbildung — Page content',
                'body' => $this->ausbildungBody(),
                'sort_order' => 1,
                'is_active' => true,
            ],
        );
    }

    /**
     * A free course still needs its conditions stated. Stored as an item row on
     * the existing courses section so the owner can reword it — the terms of a
     * government scheme are not ours to fix in code.
     */
    private function seedNavttcWarning(): void
    {
        $section = PageSection::query()
            ->where('page_slug', 'skills')
            ->where('section_key', 'courses')
            ->first();

        if (! $section) {
            return;
        }

        $items = $section->items ?? [];

        if (isset($items['warning_1'])) {
            return;
        }

        $items['warning_1'] = "NAVTTC seats are limited and allocated under a government scheme. Admission is subject to eligibility verification and seat availability, and no fee is charged by Russell's International for these courses.";

        $section->update(['items' => $items]);
    }

    /** @return array<string, string> */
    private function socialDefaults(string $network): array
    {
        return [
            'type' => 'url',
            'group' => 'social',
            'label' => ucfirst($network).' URL',
            'description' => 'Full link to the '.ucfirst($network).' profile. Leave blank to hide the icon.',
        ];
    }

    /** @return array<int, array<string, string>> */
    private function legalDocuments(): array
    {
        return [
            [
                'page_slug' => 'privacy',
                'name' => 'Privacy Policy',
                'eyebrow' => 'Privacy',
                'title' => 'Privacy Policy',
                'subtitle' => "This policy explains what personal information Russell's International collects, why we collect it, and what you can ask us to do with it.",
                'body' => $this->privacyBody(),
            ],
            [
                'page_slug' => 'terms',
                'name' => 'Terms of Service',
                'eyebrow' => 'Terms',
                'title' => 'Terms of Service',
                'subtitle' => "These terms cover the use of this website and the services Russell's International provides. Please read them before enrolling on a course or engaging us for consultancy.",
                'body' => $this->termsBody(),
            ],
        ];
    }

    private function privacyBody(): string
    {
        return <<<'TEXT'
## Who we are

Russell's International (PVT) Ltd is an education consultancy and IT training institute based at Fatima Education Complex, Pensra Road, Gojra, District Toba Tek Singh, Pakistan. You can reach us at admin@russellsinternational.com for anything in this policy.

## What we collect

We only collect information you give us, and only where we need it to answer you or deliver a service you have asked for.

- Contact details you enter in an enquiry or consultation form: your name, phone number, email address and what you are interested in
- Application details for a course, internship or job: your CV, cover message and the position you applied for
- Information needed to support a study abroad or visa application, which can include academic records, passport details and financial documents
- Basic technical information your browser sends when you visit the site, such as pages viewed and approximate location

## Why we collect it

- To reply to your enquiry and arrange a consultation
- To register you on a course and administer your training
- To prepare and submit admission or visa applications on your behalf
- To assess an application for a job or internship with us
- To send you information about programmes you have asked about

## Who we share it with

We share your information only where delivering the service requires it, and only as much of it as is needed:

- Universities, colleges and admission bodies you have asked us to apply to
- Embassies, high commissions and visa processing centres handling your application
- Government training bodies such as NAVTTC, where you are enrolled on a government-funded course
- Service providers who help us run the institute, such as our email and hosting providers

We do not sell your personal information, and we do not share it for advertising.

## How long we keep it

We keep enquiry records for as long as needed to respond and follow up. Student and application records are kept for as long as we are required to, so that we can confirm your enrolment, issue certificates and answer questions about a past application. Unsuccessful job applications are deleted within twelve months.

## Your choices

- You can ask us what information we hold about you
- You can ask us to correct anything that is wrong
- You can ask us to delete your information, where we are not required to keep it
- You can ask us to stop sending you programme updates at any time

To make any of these requests, email admin@russellsinternational.com and tell us what you would like us to do.

## Keeping your information safe

Documents you send us are stored on access-controlled systems and shared only with the staff handling your case. No system is perfectly secure, so please do not send sensitive documents over public or unsecured channels.

## Children

Our courses and services are intended for people aged 16 and over. Where a student is under 18, we ask that a parent or guardian is involved in the enrolment.

## Changes to this policy

If this policy changes, the revised version will be published on this page. Please check back before sending us anything you would rather we handled differently.
TEXT;
    }

    private function termsBody(): string
    {
        return <<<'TEXT'
## About these terms

These terms are an agreement between you and Russell's International (PVT) Ltd. By using this website, submitting an enquiry, or enrolling on a course, you accept them.

## Our services

We provide study abroad counselling, admission and visa application support, language and IELTS preparation, and IT and vocational training. What is included in any particular service is set out in the offer or enrolment confirmation we give you in writing.

## What we do not promise

Admission and visa decisions are made by universities, colleges and government authorities, not by us. We prepare and submit applications carefully and advise you honestly, but:

- We cannot guarantee an admission offer, a visa, a scholarship or a particular outcome
- Success rates published on this site describe past results and are not a promise about your application
- Processing times are set by the institutions and authorities involved

## Your responsibilities

- Give us accurate, complete and truthful information and documents
- Tell us promptly if anything you have given us changes
- Meet the deadlines we tell you about, including for documents and fees
- Pay any third-party charges — application fees, embassy fees, test fees — directly as they fall due

Submitting false or altered documents can lead to an application being refused and to a ban imposed by the authority concerned. We will end our engagement with you if we find that documents have been falsified.

## Fees and refunds

Fees for each service are quoted before you enrol and are payable as set out in your enrolment confirmation. Government-funded courses, including those under NAVTTC, are free of charge and we do not take payment for them from students.

Third-party charges paid on your behalf — application, test, embassy and courier fees — are not refundable once submitted, because we cannot recover them.

Where you cancel before we have begun work on your file, we will refund what has not yet been spent or committed. Where work has begun, a refund reflects what remains. Any refund request should be sent in writing to admin@russellsinternational.com.

## Courses and attendance

Course dates, timings and locations may change, and we will tell you as early as we can if they do. We may ask a student to leave a course for conduct that disrupts the training of others. Certificates are issued only where attendance and assessment requirements have been met.

## This website

The content, images and branding on this site belong to Russell's International and may not be copied or reused without permission. We keep the information here as accurate as we can, but course details, fees and intake dates change — please confirm anything you are relying on with us directly.

## Liability

We are responsible for carrying out our services with reasonable care and skill. We are not responsible for decisions made by third parties, for losses caused by information you gave us that was inaccurate or incomplete, or for indirect losses such as lost earnings or missed opportunities.

Nothing in these terms limits liability that cannot be limited under the law of Pakistan.

## Governing law

These terms are governed by the laws of Pakistan, and the courts of Pakistan have jurisdiction over any dispute arising from them.

## Contact

Questions about these terms can be sent to admin@russellsinternational.com or raised with us at Fatima Education Complex, Pensra Road, Gojra, District Toba Tek Singh.
TEXT;
    }

    private function ausbildungBody(): string
    {
        return <<<'TEXT'
## What Ausbildung is

Ausbildung is Germany's dual vocational training system. You are employed by a German company and paid a monthly training salary while you learn, and you spend part of each week at a vocational school covering the theory behind the job. Most programmes run for two to three and a half years and end with an examination set by the relevant chamber of commerce or crafts.

It is a working qualification rather than an academic one: you finish with a certificate that is recognised across Germany and with the years of workplace experience that went into earning it.

## Fields that commonly recruit

- Nursing and elderly care
- Hotel, restaurant and hospitality trades
- Electrical, mechanical and automotive trades
- Logistics and warehouse operations
- Retail and office administration
- IT and technical support roles

## What applicants usually need

Requirements are set by the employer and by German immigration rules, and they change. As a general picture, applicants are typically expected to have:

- Secondary education, with the level depending on the trade
- German at B1 or B2 on the Goethe scale, and often a language certificate to prove it
- Recognised or assessed school certificates
- A signed training contract with a German employer before a visa can be applied for
- Proof of funds to cover living costs beyond the training salary

## How we can help

Our German language programme runs from A1 to B2 on a Goethe-aligned syllabus, which is the part of the pathway a candidate has to complete before an employer or a visa office will take an application seriously. Speak to our counsellors about where you are now and what the next step looks like for you.

## Before you commit

Ausbildung is a serious, multi-year commitment in a country where you will be working as well as studying. A training contract, a visa decision and the recognition of your certificates are all in the hands of German employers and authorities, not ours. Be cautious of anyone who guarantees you a placement or a visa for a fee.
TEXT;
    }
}
