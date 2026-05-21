<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stat;

class StatController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true, 'data' => Stat::active()->get()]);
    }
}
