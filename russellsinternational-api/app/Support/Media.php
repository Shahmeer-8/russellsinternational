<?php

namespace App\Support;

use Illuminate\Support\Facades\URL;

class Media
{
    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        $path = ltrim($path, '/');
        $path = str_starts_with($path, 'storage/')
            ? substr($path, strlen('storage/'))
            : $path;

        return URL::to('/storage/'.$path);
    }
}
