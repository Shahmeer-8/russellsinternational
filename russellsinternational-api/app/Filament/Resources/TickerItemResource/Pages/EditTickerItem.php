<?php

namespace App\Filament\Resources\TickerItemResource\Pages;

use App\Filament\Resources\TickerItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTickerItem extends EditRecord
{
    protected static string $resource = TickerItemResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
