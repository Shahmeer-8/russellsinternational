<?php

namespace App\Filament\Resources\LanguageProgramResource\Pages;

use App\Filament\Resources\LanguageProgramResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLanguageProgram extends EditRecord
{
    protected static string $resource = LanguageProgramResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['benefits'] = $this->listToRepeater($data['benefits'] ?? []);

        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['benefits'] = $this->normalizeRepeaterList($data['benefits'] ?? []);

        return $data;
    }

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }

    private function listToRepeater(mixed $items): array
    {
        if (is_string($items)) {
            $decoded = json_decode($items, true);
            $items = json_last_error() === JSON_ERROR_NONE ? $decoded : [$items];
        }

        if (! is_array($items)) {
            return [];
        }

        return collect($items)
            ->map(fn ($item) => ['item' => is_array($item) ? ($item['item'] ?? $item['value'] ?? $item['text'] ?? '') : $item])
            ->filter(fn ($item) => $item['item'] !== '')
            ->values()
            ->all();
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
