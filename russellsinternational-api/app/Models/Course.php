<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'type', 'icon_name', 'title', 'description', 'image', 'duration',
        'students_count', 'price', 'tag', 'color_class',
        'what_you_learn', 'highlights', 'pdf_brochure',
        'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'what_you_learn' => 'array',
        'highlights' => 'array',
    ];

    protected $appends = ['pdf_url', 'image_url'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function scopePaid($query)
    {
        return $query->where('type', 'paid');
    }

    public function scopeNavttc($query)
    {
        return $query->where('type', 'navttc');
    }

    public function getPdfUrlAttribute(): ?string
    {
        return Media::url($this->pdf_brochure);
    }

    public function getImageUrlAttribute(): ?string
    {
        return Media::url($this->image);
    }

    public function getWhatYouLearnAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }

    public function getHighlightsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }
}
