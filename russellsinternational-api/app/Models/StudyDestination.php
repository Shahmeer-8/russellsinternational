<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class StudyDestination extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'flag_emoji', 'country', 'partner_unis_count', 'description',
        'highlight_unis', 'intake_periods', 'visa_success_rate',
        'services', 'scholarships', 'image', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'services' => 'array',
        'scholarships' => 'array',
    ];

    protected $appends = ['image_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function getImageUrlAttribute(): ?string
    {
        return Media::url($this->image);
    }

    public function getServicesAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }

    public function getScholarshipsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }
}
