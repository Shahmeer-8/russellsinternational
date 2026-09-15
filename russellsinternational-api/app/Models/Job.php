<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'title', 'company', 'location', 'type', 'salary',
        'description', 'requirements', 'application_email',
        'deadline', 'is_active', 'pdf_brochure',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'requirements' => 'array',
        'deadline' => 'date',
    ];

    protected $appends = ['pdf_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->latest();
    }

    public function getRequirementsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }

    /** Optional brochure with the full details of this programme. */
    public function getPdfUrlAttribute(): ?string
    {
        return Media::url($this->pdf_brochure);
    }
}
