<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LanguageProgram;
use Illuminate\Http\Request;

class LanguageProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = LanguageProgram::active();

        if ($request->filled('code')) {
            $codes = match ($request->code) {
                'english' => ['english', 'ielts', 'pte', 'toefl', 'languagecert'],
                'german' => ['german', 'goethe', 'testdaf', 'telc'],
                'korean' => ['korean', 'topik', 'eps-topik'],
                default => [$request->code],
            };

            $query->whereIn('language_code', $codes);
        }

        return response()->json(['success' => true, 'data' => $query->get()]);
    }

    public function show(int $id)
    {
        return response()->json([
            'success' => true,
            'data' => LanguageProgram::active()->findOrFail($id),
        ]);
    }
}
