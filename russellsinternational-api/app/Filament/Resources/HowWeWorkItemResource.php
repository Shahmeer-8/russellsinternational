<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HowWeWorkItemResource\Pages;
use App\Models\HowWeWorkItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HowWeWorkItemResource extends Resource
{
    protected static ?string $model = HowWeWorkItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $navigationGroup = 'About Page';

    protected static ?string $navigationLabel = 'How We Work Cards';

    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->helperText('The way of working this card describes, e.g. "Coaching and Mentoring".')
                ->required()
                ->maxLength(200),
            Forms\Components\TextInput::make('author')
                ->label('Quote author')
                ->helperText('Name only — the website adds the dash before it.')
                ->maxLength(150),
            Forms\Components\Textarea::make('quote')
                ->helperText('Without surrounding quotation marks; the website adds those.')
                ->required()
                ->rows(3)
                ->columnSpanFull(),
            Forms\Components\FileUpload::make('image')
                ->image()
                ->disk('public')
                ->visibility('public')
                ->directory('how-we-work')
                ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif'])
                ->maxSize(2048)
                ->imagePreviewHeight('180')
                ->imageEditor()
                ->columnSpanFull(),
            Forms\Components\TextInput::make('sort_order')->numeric()->minValue(0)->maxValue(255)->default(0),
            Forms\Components\Toggle::make('is_active')->label('Visible on website')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->reorderable('sort_order')->columns([
            Tables\Columns\ImageColumn::make('image')->disk('public')->label('Image'),
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('author')->label('Quote author')->searchable(),
            Tables\Columns\TextColumn::make('sort_order')->sortable(),
            Tables\Columns\ToggleColumn::make('is_active')->label('Visible'),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHowWeWorkItems::route('/'),
            'create' => Pages\CreateHowWeWorkItem::route('/create'),
            'edit' => Pages\EditHowWeWorkItem::route('/{record}/edit'),
        ];
    }
}
