<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'icon_name', 'image', 'title', 'description', 'details', 'link_url',
        'color_class', 'key_benefits', 'sort_order', 'is_active', 'pdf_brochure',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'key_benefits' => 'array',
    ];

    protected $appends = ['image_url', 'pdf_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function getImageUrlAttribute(): ?string
    {
        return Media::url($this->image);
    }

    public function getKeyBenefitsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }

    /** Optional brochure with the full details of this programme. */
    public function getPdfUrlAttribute(): ?string
    {
        return Media::url($this->pdf_brochure);
    }
}
