<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class InternshipRecord extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'title', 'period', 'participants_count', 'description',
        'achievements', 'image', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'participants_count' => 'integer',
        'achievements' => 'array',
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

    /**
     * The admin repeater stores rows as [{item: "..."}], so flatten them the way
     * the other list-bearing models do.
     */
    public function getAchievementsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }
}
