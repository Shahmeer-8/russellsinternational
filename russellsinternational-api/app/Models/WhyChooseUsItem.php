<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class WhyChooseUsItem extends Model
{
    protected $fillable = [
        'icon_name', 'image', 'title', 'description',
        'color_class', 'sort_order', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean', 'sort_order' => 'integer'];

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
