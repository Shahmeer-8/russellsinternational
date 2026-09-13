<?php

namespace App\Filament\Resources\InternshipRecordResource\Pages;

use App\Filament\Resources\InternshipRecordResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditInternshipRecord extends EditRecord
{
    protected static string $resource = InternshipRecordResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
