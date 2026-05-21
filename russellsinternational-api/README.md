# Russell's International — Laravel Backend

REST API + Filament Admin Panel for the Russell's International website.

---

## Requirements

| Dependency | Version  |
|------------|----------|
| PHP        | 8.2+     |
| Composer   | 2.x      |
| MySQL      | 8.0+     |
| Node.js    | 18+ (for frontend) |

---

## First-time Setup

```bash
# 1. Install dependencies
composer install

# 2. Copy environment file and fill in values
cp .env.example .env

# 3. Generate application key
php artisan key:generate

# 4. Create the database, then run migrations
php artisan migrate

# 5. Seed with initial content
php artisan db:seed

# 6. Create the storage symlink (for uploaded files)
php artisan storage:link

# 7. Create the first admin user
php artisan make:filament-user

# 8. Start the dev server
php artisan serve
```

The API is now available at **http://localhost:8000/api/v1**  
The admin panel is available at **http://localhost:8000/admin**

---

## Environment Variables

Key variables to configure in `.env`:

```dotenv
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:8080

DB_DATABASE=russells_international
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_FROM_ADDRESS="no-reply@russellsinternational.com"
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/hero-slides` | Active hero carousel slides |
| GET | `/api/v1/ticker-items` | Ticker bar items |
| GET | `/api/v1/stats` | Homepage stats |
| GET | `/api/v1/services` | Services list |
| GET | `/api/v1/why-choose-us` | Why Choose Us items |
| GET | `/api/v1/courses` | Courses (filter: `?type=paid\|navttc`) |
| GET | `/api/v1/courses/{id}` | Single course |
| GET | `/api/v1/study-destinations` | Study destinations |
| GET | `/api/v1/language-programs` | Language programs |
| GET | `/api/v1/jobs` | Jobs (filter: `?type=`, `?search=`) |
| GET | `/api/v1/internships` | Internships |
| GET | `/api/v1/events` | Events/News (filter: `?type=event\|news`) |
| GET | `/api/v1/gallery` | Gallery photos (filter: `?category=`) |
| GET | `/api/v1/testimonials` | Testimonials (filter: `?type=written\|video`) |
| GET | `/api/v1/settings` | Site settings (filter: `?group=contact\|social\|seo`) |
| GET | `/api/v1/pages/{slug}` | Page SEO metadata |
| POST | `/api/v1/contact` | Submit contact enquiry |
| POST | `/api/v1/careers/apply` | Submit job/internship application |

---

## Frontend Integration

Add to the React frontend's `.env`:

```dotenv
VITE_API_URL=http://localhost:8000
```

All data fetching hooks are in `src/hooks/api/index.ts` using TanStack Query.  
All API types are in `src/types/api.ts`.  
All components fall back to static data when the API is unavailable.
