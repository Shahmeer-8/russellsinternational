<?php

namespace App\Filament\Resources\HowWeWorkItemResource\Pages;

use App\Filament\Resources\HowWeWorkItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHowWeWorkItems extends ListRecords
{
    protected static string $resource = HowWeWorkItemResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
