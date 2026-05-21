<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;

class HeroSlideController extends Controller
{
    public function index()
    {
        $slides = HeroSlide::active()->get()
            ->map(fn ($s) => array_merge($s->toArray(), ['image_url' => $s->image_url]));

        return response()->json(['success' => true, 'data' => $slides]);
    }
}
