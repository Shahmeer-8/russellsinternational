<?php

namespace App\Models\Concerns;

trait NormalizesJsonLists
{
    protected function normalizeList(mixed $value): array
    {
        if (is_string($value)) {
            $decoded = json_decode($value, true);
            $value = json_last_error() === JSON_ERROR_NONE ? $decoded : [$value];
        }

        if (! is_array($value)) {
            return [];
        }

        return collect($value)
            ->map(function ($item) {
                if (is_array($item)) {
                    return $item['item'] ?? $item['value'] ?? $item['text'] ?? null;
                }

                return $item;
            })
            ->filter(fn ($item) => $item !== null && $item !== '')
            ->values()
            ->all();
    }
}
