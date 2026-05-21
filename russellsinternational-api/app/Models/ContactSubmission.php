<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'name', 'phone', 'email', 'interest',
        'message', 'status', 'admin_notes', 'ip_address',
    ];

    protected $casts = ['status' => 'string'];

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function markAsRead(): void
    {
        $this->update(['status' => 'read']);
    }
}
