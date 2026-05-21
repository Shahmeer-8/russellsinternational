<?php

namespace App\Filament\Resources\LanguageProgramResource\Pages;

use App\Filament\Resources\LanguageProgramResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditLanguageProgram extends EditRecord
{
    protected static string $resource = LanguageProgramResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
