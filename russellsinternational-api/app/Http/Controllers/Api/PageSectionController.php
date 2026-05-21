<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;

class PageSectionController extends Controller
{
    public function index(string $page)
    {
        $sections = PageSection::active()
            ->where('page_slug', $page)
            ->get()
            ->keyBy('section_key');

        return response()->json(['success' => true, 'data' => $sections]);
    }

    public function show(string $page, string $section)
    {
        $record = PageSection::active()
            ->where('page_slug', $page)
            ->where('section_key', $section)
            ->firstOrFail();

        return response()->json(['success' => true, 'data' => $record]);
    }
}
