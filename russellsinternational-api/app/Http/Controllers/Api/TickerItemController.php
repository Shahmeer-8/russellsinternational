<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TickerItem;

class TickerItemController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => TickerItem::active()->get(),
        ]);
    }
}
