<?php

namespace App\Models;

use App\Support\Media;
use Illuminate\Database\Eloquent\Model;

class CareerApplication extends Model
{
    protected $fillable = [
        'application_type', 'position_id', 'position_title',
        'name', 'email', 'phone', 'cover_letter',
        'cv_path', 'portfolio_url', 'status', 'admin_notes', 'ip_address',
    ];

    public function getCvUrlAttribute(): ?string
    {
        return Media::url($this->cv_path);
    }
}
