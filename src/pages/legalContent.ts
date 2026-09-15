/**
 * The text both legal pages fall back to before the admin has edited them.
 *
 * Kept here rather than inline in the routes so the same wording can be seeded
 * into `page_sections` byte for byte — see LegalPageSeeder.php. If you change a
 * word here, change it there, or seeding a fresh install will quietly produce a
 * different document from the one this build renders.
 *
 * These are a starting point written around what this business actually does —
 * enquiry forms, course applications, CV uploads, visa paperwork. They are not
 * legal advice and the client should have them reviewed before relying on them.
 */

export const PRIVACY_POLICY = {
  eyebrow: "Privacy",
  title: "Privacy Policy",
  intro:
    "This policy explains what personal information Russell's International collects, why we collect it, and what you can ask us to do with it.",
  body: `## Who we are

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

If this policy changes, the revised version will be published on this page. Please check back before sending us anything you would rather we handled differently.`,
};

export const TERMS_OF_SERVICE = {
  eyebrow: "Terms",
  title: "Terms of Service",
  intro:
    "These terms cover the use of this website and the services Russell's International provides. Please read them before enrolling on a course or engaging us for consultancy.",
  body: `## About these terms

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

Questions about these terms can be sent to admin@russellsinternational.com or raised with us at Fatima Education Complex, Pensra Road, Gojra, District Toba Tek Singh.`,
};
