<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'icon_name', 'title', 'description', 'details',
        'color_class', 'key_benefits', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'key_benefits' => 'array',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }

    public function getKeyBenefitsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }
}
