<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'content_type', 'tag', 'tag_color', 'title', 'event_date',
        'short_description', 'full_details', 'image', 'venue',
        'capacity', 'is_featured', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'event_date' => 'date',
        'capacity' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->latest('event_date');
    }

    public function scopeEvents($query)
    {
        return $query->where('content_type', 'event');
    }

    public function scopeNews($query)
    {
        return $query->where('content_type', 'news');
    }

    public function getImageUrlAttribute(): ?string
    {
        return Media::url($this->image);
    }

    public function getFormattedDateAttribute(): ?string
    {
        return $this->event_date ? $this->event_date->format('F j, Y') : null;
    }
}
