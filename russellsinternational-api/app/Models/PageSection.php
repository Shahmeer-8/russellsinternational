<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    protected $fillable = [
        'page_slug', 'section_key', 'name', 'eyebrow', 'title', 'subtitle',
        'body', 'image', 'cta_label', 'cta_url', 'secondary_cta_label',
        'secondary_cta_url', 'items', 'extra', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'items' => 'array',
        'extra' => 'array',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
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
}
