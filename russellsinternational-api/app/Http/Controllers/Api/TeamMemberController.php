<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;

class TeamMemberController extends Controller
{
    public function index()
    {
        $members = TeamMember::active()->get()
            ->map(fn ($m) => array_merge($m->toArray(), ['image_url' => $m->image_url]));

        return response()->json(['success' => true, 'data' => $members]);
    }
}
