<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TickerItem extends Model
{
    protected $fillable = ['emoji', 'text', 'sort_order', 'is_active'];

    protected $casts = ['is_active' => 'boolean', 'sort_order' => 'integer'];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
