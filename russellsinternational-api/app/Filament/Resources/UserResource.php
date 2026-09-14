<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Hash;

/**
 * Admin accounts.
 *
 * Until now the only way to add someone to the panel was `php artisan
 * make:filament-user` on the server, which means the owner needed a developer to
 * give a colleague access. This puts it in the panel.
 *
 * Two guards worth keeping: a password is only written when one is actually
 * typed, so editing a name cannot silently blank someone's login; and the last
 * remaining account cannot be deleted, which would lock everyone out of the site.
 */
class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-circle';

    protected static ?string $navigationLabel = 'Admin Users';

    protected static ?string $modelLabel = 'admin user';

    protected static ?int $navigationSort = 90;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(150),
            Forms\Components\TextInput::make('email')
                ->label('Email address')
                ->email()
                ->required()
                ->unique('users', 'email', ignoreRecord: true)
                ->maxLength(190),
            Forms\Components\TextInput::make('password')
                ->password()
                ->revealable()
                ->helperText(fn (string $operation) => $operation === 'edit'
                    ? 'Leave blank to keep the current password.'
                    : 'At least 8 characters.')
                ->required(fn (string $operation) => $operation === 'create')
                ->minLength(8)
                ->maxLength(190)
                ->dehydrated(fn (?string $state) => filled($state))
                ->dehydrateStateUsing(fn (string $state) => Hash::make($state)),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('email')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('created_at')->label('Added')->date()->sortable(),
        ])->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make()
                // Deleting the only account would lock everyone out of the panel.
                ->hidden(fn () => User::query()->count() <= 1),
        ])->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
