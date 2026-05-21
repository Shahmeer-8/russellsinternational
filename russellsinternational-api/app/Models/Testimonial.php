<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'type', 'name', 'program', 'quote', 'image',
        'youtube_id', 'rating', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'rating' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function scopeWritten($query)
    {
        return $query->where('type', 'written');
    }

    public function scopeVideo($query)
    {
        return $query->where('type', 'video');
    }

    public function getImageUrlAttribute(): ?string
    {
        return Media::url($this->image);
    }

    public function setYoutubeIdAttribute(?string $value): void
    {
        $this->attributes['youtube_id'] = $this->extractYoutubeId($value);
    }

    public function getYoutubeIdAttribute(?string $value): ?string
    {
        return $this->extractYoutubeId($value);
    }

    private function extractYoutubeId(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        $value = trim($value);

        if (preg_match('/^[A-Za-z0-9_-]{11}$/', $value)) {
            return $value;
        }

        $patterns = [
            '/youtu\.be\/([A-Za-z0-9_-]{11})/',
            '/youtube\.com\/watch\?[^#]*v=([A-Za-z0-9_-]{11})/',
            '/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/',
            '/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $value, $matches)) {
                return $matches[1];
            }
        }

        return $value;
    }
}
