<?php

namespace App\Filament\Resources\LanguageProgramResource\Pages;

use App\Filament\Resources\LanguageProgramResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListLanguagePrograms extends ListRecords
{
    protected static string $resource = LanguageProgramResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
