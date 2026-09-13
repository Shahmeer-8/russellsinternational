<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InternshipRecord;

class InternshipRecordController extends Controller
{
    public function index()
    {
        $records = InternshipRecord::active()->get()
            ->map(fn ($record) => array_merge($record->toArray(), [
                'image_url' => $record->image_url,
                'achievements' => $record->achievements,
            ]));

        return response()->json(['success' => true, 'data' => $records]);
    }
}
