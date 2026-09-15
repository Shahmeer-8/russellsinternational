<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NavigationItem;

class NavigationController extends Controller
{
    public function index()
    {
        $items = NavigationItem::active()->get();

        /*
         * Header links come back nested one level deep: a top-level link carries its
         * submenu in `children`, and the children are not repeated at the top level.
         *
         * Nesting here rather than in the navbar keeps the shape the same for every
         * consumer, and means an admin who puts a link under a parent that is itself
         * hidden gets a link that disappears with its parent — which is what they
         * asked for by nesting it — instead of one that quietly jumps up a level.
         */
        $header = $items->where('location', 'header');
        $childrenByParent = $header->whereNotNull('parent_id')->groupBy('parent_id');

        return response()->json([
            'success' => true,
            'data' => [
                'header' => $header
                    ->whereNull('parent_id')
                    ->map(function (NavigationItem $item) use ($childrenByParent) {
                        $item->setAttribute(
                            'children',
                            $childrenByParent->get($item->id, collect())->values()->all(),
                        );

                        return $item;
                    })
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
