<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'slug', 'name', 'meta_title', 'meta_description',
        'og_image', 'og_title', 'og_description', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean'];

    public function getOgImageUrlAttribute(): ?string
    {
        return Media::url($this->og_image);
    }
}
