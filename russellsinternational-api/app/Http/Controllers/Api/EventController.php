<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::active();

        if ($request->filled('type') && in_array($request->type, ['event', 'news'])) {
            $query->where('content_type', $request->type);
        }

        if ($request->filled('category')) {
            $query->where('tag', $request->category);
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        $events = $query->paginate($request->get('per_page', 12));

        $events = $events->through(fn (Event $event) => array_merge(
            $event->toArray(),
            [
                'image_url' => $event->image_url,
                'formatted_date' => $event->formatted_date,
            ]
        ));

        return response()->json(['success' => true, 'data' => $events]);
    }

    public function show(int $id)
    {
        $event = Event::active()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => array_merge($event->toArray(), [
                'image_url' => $event->image_url,
                'formatted_date' => $event->formatted_date,
            ]),
        ]);
    }
}
