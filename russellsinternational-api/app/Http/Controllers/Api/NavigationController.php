<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;

class NavigationController extends Controller
{
    public function index()
    {
        $items = NavigationItem::active()->get();

        return response()->json([
            'success' => true,
            'data' => [
                'header' => $items
                    ->where('location', 'header')
                    ->values()
                    ->all(),
                'footer' => $items
                    ->where('location', 'footer')
                    ->groupBy(fn (NavigationItem $item) => $item->footer_column ?: 'More')
                    ->map(fn ($links, $title) => [
                        'title' => $title,
                        'links' => $links->values()->all(),
                    ])
                    ->values()
                    ->all(),
            ],
        ]);
    }
}
