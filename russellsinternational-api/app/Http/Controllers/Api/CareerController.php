<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CareerApplication;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CareerController extends Controller
{
    public function apply(Request $request)
    {
        try {
            $validated = $request->validate([
                'application_type' => 'required|in:job,internship',
                'position_id' => 'nullable|integer',
                'position_title' => 'required|string|max:200',
                'name' => 'required|string|max:100',
                'email' => 'required|email|max:150',
                'phone' => 'nullable|string|max:20',
                'cover_letter' => 'nullable|string|max:5000',
                'portfolio_url' => 'nullable|url|max:500',
                'cv' => 'nullable|file|mimes:pdf,doc,docx|max:5120', // 5 MB
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        }

        $cvPath = null;
        if ($request->hasFile('cv')) {
            $cvPath = $request->file('cv')->store('applications/cvs', 'public');
        }

        CareerApplication::create(array_merge(
            collect($validated)->except('cv')->toArray(),
            [
                'cv_path' => $cvPath,
                'ip_address' => $request->ip(),
            ]
        ));

        return response()->json([
            'success' => true,
            'message' => 'Your application has been submitted! We will review it and contact you soon.',
        ], 201);
    }
}
