<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::active();

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('company', 'like', '%'.$request->search.'%');
            });
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
            'data' => Job::active()->findOrFail($id),
        ]);
    }
}
