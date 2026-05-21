<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'title', 'company', 'location', 'duration', 'type',
        'description', 'skills', 'gains', 'image', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'skills' => 'array',
        'gains' => 'array',
    ];

    protected $appends = ['image_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->latest();
    }

    public function getImageUrlAttribute(): ?string
    {
        return Media::url($this->image);
    }

    public function getSkillsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }

    public function getGainsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }
}
