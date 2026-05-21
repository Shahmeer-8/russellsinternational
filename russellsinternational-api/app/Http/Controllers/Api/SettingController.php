<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        if ($request->filled('group')) {
            $data = Setting::group($request->group);
        } else {
            $data = Setting::query()->pluck('value', 'key')->toArray();
        }

        return response()->json(['success' => true, 'data' => $data]);
    }

    public function show(string $key)
    {
        $value = Setting::get($key);

        if ($value === null) {
            return response()->json(['success' => false, 'message' => 'Setting not found'], 404);
        }

        return response()->json(['success' => true, 'data' => ['key' => $key, 'value' => $value]]);
    }
}
