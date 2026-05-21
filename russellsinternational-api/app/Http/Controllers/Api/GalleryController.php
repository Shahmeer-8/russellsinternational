<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryPhoto;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = GalleryPhoto::active();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $photos = $query->get()->map(fn ($p) => array_merge(
            $p->toArray(),
            ['image_url' => $p->image_url]
        ));

        return response()->json(['success' => true, 'data' => $photos]);
    }
}
