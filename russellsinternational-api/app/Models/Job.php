<?php

namespace App\Models;

use App\Models\Concerns\NormalizesJsonLists;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use NormalizesJsonLists;

    protected $fillable = [
        'title', 'company', 'location', 'type', 'salary',
        'description', 'requirements', 'application_email',
        'deadline', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'requirements' => 'array',
        'deadline' => 'date',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true)->latest();
    }

    public function getRequirementsAttribute($value): array
    {
        return $this->normalizeList(json_decode($value ?? '[]', true));
    }
}
