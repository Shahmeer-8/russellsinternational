<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $query = Course::active();

        if ($request->filled('type') && in_array($request->type, ['paid', 'navttc'])) {
            $query->where('type', $request->type);
        }

        return response()->json(['success' => true, 'data' => $query->get()]);
    }

    public function show(int $id)
    {
        $course = Course::active()->findOrFail($id);

        return response()->json(['success' => true, 'data' => $course]);
    }
}
