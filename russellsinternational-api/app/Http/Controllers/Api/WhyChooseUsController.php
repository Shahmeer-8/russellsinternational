<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhyChooseUsItem;

class WhyChooseUsController extends Controller
{
    public function index()
    {
        return response()->json(['success' => true, 'data' => WhyChooseUsItem::active()->get()]);
    }
}
