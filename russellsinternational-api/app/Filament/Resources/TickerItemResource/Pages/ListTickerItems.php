<?php

namespace App\Filament\Resources\TickerItemResource\Pages;

use App\Filament\Resources\TickerItemResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTickerItems extends ListRecords
{
    protected static string $resource = TickerItemResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
