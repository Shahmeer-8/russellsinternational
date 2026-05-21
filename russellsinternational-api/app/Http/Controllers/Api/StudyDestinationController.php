<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudyDestination;

class StudyDestinationController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => StudyDestination::active()->get(),
        ]);
    }

    public function show(int $id)
    {
        return response()->json([
            'success' => true,
            'data' => StudyDestination::active()->findOrFail($id),
        ]);
    }
}
