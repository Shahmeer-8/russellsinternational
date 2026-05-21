<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100',
                'phone' => 'nullable|string|max:20',
                'email' => 'required|email|max:150',
                'interest' => 'nullable|string|max:100',
                'message' => 'nullable|string|max:2000',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        }

        ContactSubmission::create(array_merge($validated, [
            'ip_address' => $request->ip(),
        ]));

        return response()->json([
            'success' => true,
            'message' => "Thank you {$validated['name']}! We'll get back to you within 24 hours.",
        ], 201);
    }
}
