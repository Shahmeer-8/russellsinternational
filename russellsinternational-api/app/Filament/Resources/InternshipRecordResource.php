<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InternshipRecordResource\Pages;
use App\Models\InternshipRecord;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class InternshipRecordResource extends Resource
{
    protected static ?string $model = InternshipRecord::class;

    protected static ?string $navigationIcon = 'heroicon-o-trophy';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $navigationGroup = 'Careers Page';

    protected static ?string $navigationLabel = 'Internship Record';

    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Programme')->schema([
                Forms\Components\TextInput::make('title')
                    ->helperText('Name of the completed programme, e.g. "Frontend Development Internship".')
                    ->required()
                    ->maxLength(200),
                Forms\Components\TextInput::make('period')
                    ->helperText('When it ran, written however reads best: "Summer 2025", "Winter 2024/25".')
                    ->required()
                    ->maxLength(100),
                Forms\Components\TextInput::make('participants_count')
                    ->label('Participants')
                    ->helperText('How many interns took part. Leave blank to hide this on the website.')
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(65535),
                Forms\Components\Textarea::make('description')->rows(3)->columnSpanFull(),
            ])->columns(3),

            Forms\Components\Section::make('Achievements & photo')->schema([
                Forms\Components\Repeater::make('achievements')
                    ->helperText('One achievement per row, e.g. "18 interns placed in full-time roles".')
                    ->simple(Forms\Components\TextInput::make('item')->required())
                    ->defaultItems(2),
                Forms\Components\FileUpload::make('image')
                    ->label('Group photo')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->directory('internship-records')
                    ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'])
                    ->maxSize(2048)
                    ->imagePreviewHeight('180')
                    ->imageEditor(),
            ])->columns(2),

            Forms\Components\Section::make('Display')->schema([
                Forms\Components\TextInput::make('sort_order')->numeric()->minValue(0)->maxValue(255)->default(0),
                Forms\Components\Toggle::make('is_active')->label('Visible on website')->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->reorderable('sort_order')->columns([
            Tables\Columns\ImageColumn::make('image')->disk('public')->label('Photo'),
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('period')->searchable(),
            Tables\Columns\TextColumn::make('participants_count')->label('Participants'),
            Tables\Columns\TextColumn::make('sort_order')->sortable(),
            Tables\Columns\ToggleColumn::make('is_active')->label('Visible'),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInternshipRecords::route('/'),
            'create' => Pages\CreateInternshipRecord::route('/create'),
            'edit' => Pages\EditInternshipRecord::route('/{record}/edit'),
        ];
    }
}
