<?php

namespace App\Filament\Resources\HowWeWorkItemResource\Pages;

use App\Filament\Resources\HowWeWorkItemResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHowWeWorkItem extends EditRecord
{
    protected static string $resource = HowWeWorkItemResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
