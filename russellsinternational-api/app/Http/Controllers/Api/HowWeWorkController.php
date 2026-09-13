<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HowWeWorkItem;

class HowWeWorkController extends Controller
{
    public function index()
    {
        $items = HowWeWorkItem::active()->get()
            ->map(fn ($item) => array_merge($item->toArray(), ['image_url' => $item->image_url]));

        return response()->json(['success' => true, 'data' => $items]);
    }
}
