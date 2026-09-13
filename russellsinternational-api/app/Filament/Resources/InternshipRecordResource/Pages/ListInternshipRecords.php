<?php

namespace App\Filament\Resources\InternshipRecordResource\Pages;

use App\Filament\Resources\InternshipRecordResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListInternshipRecords extends ListRecords
{
    protected static string $resource = InternshipRecordResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
