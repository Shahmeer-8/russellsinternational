<?php

namespace App\Filament\Resources\StudyDestinationResource\Pages;

use App\Filament\Resources\StudyDestinationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStudyDestinations extends ListRecords
{
    protected static string $resource = StudyDestinationResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
