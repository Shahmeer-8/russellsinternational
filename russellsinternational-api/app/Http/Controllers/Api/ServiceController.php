<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true, 'data' => Service::active()->get()]);
    }

    public function show(int $id)
    {
        return response()->json(['success' => true, 'data' => Service::active()->findOrFail($id)]);
    }
}
