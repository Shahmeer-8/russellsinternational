<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimonial::active();

        if ($request->filled('type') && in_array($request->type, ['written', 'video'])) {
            $query->where('type', $request->type);
        }

        $testimonials = $query->get()->map(fn ($t) => array_merge(
            $t->toArray(),
            ['image_url' => $t->image_url]
        ));

        return response()->json(['success' => true, 'data' => $testimonials]);
    }
}
