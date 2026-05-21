<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LanguageProgramResource\Pages;
use App\Models\LanguageProgram;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class LanguageProgramResource extends Resource
{
    protected static ?string $model = LanguageProgram::class;

    protected static ?string $navigationIcon = 'heroicon-o-language';

    protected static ?string $navigationGroup = 'Languages';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('flag_emoji')->required()->placeholder('🇬🇧'),
            Forms\Components\Select::make('language_code')
                ->options(['ielts' => 'IELTS', 'german' => 'German', 'korean' => 'Korean'])
                ->required(),
            Forms\Components\TextInput::make('title')->required()->maxLength(200),
            Forms\Components\TextInput::make('duration')->required()->placeholder('8 Weeks'),
            Forms\Components\TextInput::make('badge')->required()->placeholder('Most Popular'),
            Forms\Components\TextInput::make('color_class')->default('bg-blue-50 text-blue-600'),
            Forms\Components\Textarea::make('description')->required()->rows(3)->columnSpanFull(),
            Forms\Components\Repeater::make('benefits')
                ->schema([Forms\Components\TextInput::make('item')->required()])
                ->defaultItems(4)->collapsible()->columnSpanFull(),
            Forms\Components\FileUpload::make('image')
                ->image()
                ->disk('public')
                ->visibility('public')
                ->directory('language-programs')
                ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/bmp', 'image/svg+xml'])
                ->maxSize(2048)
                ->imagePreviewHeight('180')
                ->imageEditor()
                ->downloadable()
                ->openable(),
            Forms\Components\TextInput::make('sort_order')->numeric()->minValue(0)->maxValue(255)->default(0),
            Forms\Components\Toggle::make('is_active')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')
            ->columns([
                Tables\Columns\TextColumn::make('flag_emoji')->label(''),
                Tables\Columns\TextColumn::make('language_code')->badge(),
                Tables\Columns\TextColumn::make('title')->searchable(),
                Tables\Columns\TextColumn::make('duration'),
                Tables\Columns\TextColumn::make('badge'),
                Tables\Columns\ToggleColumn::make('is_active'),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLanguagePrograms::route('/'),
            'create' => Pages\CreateLanguageProgram::route('/create'),
            'edit' => Pages\EditLanguageProgram::route('/{record}/edit'),
        ];
    }
}
