<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Internship;
use Illuminate\Http\Request;

class InternshipController extends Controller
{
    public function index(Request $request)
    {
        $query = Internship::active();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate($request->get('per_page', 20)),
        ]);
    }

    public function show(int $id)
    {
        return response()->json([
            'success' => true,
            'data' => Internship::active()->findOrFail($id),
        ]);
    }
}
