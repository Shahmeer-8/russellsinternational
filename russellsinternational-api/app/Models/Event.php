<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'content_type', 'tag', 'tag_color', 'title', 'event_date',
        'short_description', 'full_details', 'image', 'images', 'venue',
        'capacity', 'is_featured', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'event_date' => 'date',
        'capacity' => 'integer',
        'images' => 'array',
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

    /**
     * Public URLs for the extra photographs, cover first.
     *
     * The cover leads so a gallery never opens on a picture the visitor has not
     * seen on the card they clicked, and duplicates are dropped for admins who
     * upload the cover into the gallery as well.
     *
     * @return array<int, string>
     */
    public function getImageUrlsAttribute(): array
    {
        $paths = array_merge([$this->image], $this->images ?? []);

        return collect($paths)
            ->filter()
            ->unique()
            ->map(fn (string $path) => Media::url($path))
            ->filter()
            ->values()
            ->all();
    }

    public function getFormattedDateAttribute(): ?string
    {
        return $this->event_date ? $this->event_date->format('F j, Y') : null;
    }
}
