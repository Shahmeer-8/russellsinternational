<?php

namespace App\Filament\Resources\LanguageProgramResource\Pages;

use App\Filament\Resources\LanguageProgramResource;
use Filament\Resources\Pages\CreateRecord;

class CreateLanguageProgram extends CreateRecord
{
    protected static string $resource = LanguageProgramResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['benefits'] = $this->normalizeRepeaterList($data['benefits'] ?? []);

        return $data;
    }

    private function normalizeRepeaterList(mixed $items): array
    {
        if (! is_array($items)) {
            return [];
        }

        return collect($items)
            ->map(fn ($item) => is_array($item) ? ($item['item'] ?? null) : $item)
            ->filter(fn ($item) => $item !== null && $item !== '')
            ->values()
            ->all();
    }
}
