<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Same guard as the table row action: removing the last account would
            // leave nobody able to sign in to the panel.
            Actions\DeleteAction::make()->hidden(fn () => User::query()->count() <= 1),
        ];
    }
}
