<?php

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => "Russell's International API",
        'version' => '1.0.0',
        'status' => 'running',
        'admin' => url('/admin'),
        'api' => url('/api/v1'),
    ]);
});

Route::get('/storage/{path}', function (string $path) {
    abort_if(str_contains($path, '..'), 404);

    $file = storage_path('app/public/'.$path);
    abort_unless(is_file($file), 404);

    return Response::file($file, [
        'Cache-Control' => 'public, max-age=31536000, immutable',
    ]);
})->where('path', '.*');
