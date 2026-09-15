<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InternshipResource\Pages;
use App\Models\Internship;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class InternshipResource extends Resource
{
    protected static ?string $model = Internship::class;

    protected static ?string $navigationIcon = 'heroicon-o-rocket-launch';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $navigationGroup = 'Careers';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Details')->schema([
                Forms\Components\TextInput::make('title')->required()->maxLength(200),
                Forms\Components\TextInput::make('company')->required(),
                Forms\Components\TextInput::make('location')->required(),
                Forms\Components\TextInput::make('duration')->required()->placeholder('3 Months'),
                Forms\Components\Select::make('type')
                    ->label('Pay')
                    ->options(['Paid' => 'Paid', 'Unpaid' => 'Unpaid', 'Stipend' => 'Unpaid (Stipend)'])
                    ->required(),
                Forms\Components\Select::make('category')
                    ->label('Group')
                    ->helperText('Which group on the Careers page this appears under.')
                    ->options(['regular' => 'Paid Internships', 'summer' => 'Summer Internship Programs'])
                    ->default('regular')
                    ->required(),
                Forms\Components\Textarea::make('description')->required()->rows(3),
            ])->columns(2),

            Forms\Components\Section::make('Skills & Benefits')->schema([
                Forms\Components\Repeater::make('skills')
                    ->simple(Forms\Components\TextInput::make('item')->required())
                    ->defaultItems(3),
                Forms\Components\Repeater::make('gains')
                    ->label('What They\'ll Gain')
                    ->simple(Forms\Components\TextInput::make('item')->required())
                    ->defaultItems(5),
            ])->columns(2),

            Forms\Components\Section::make('Media & Status')->schema([
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->directory('internships')
                    ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/bmp', 'image/svg+xml'])
                    ->maxSize(2048)
                    ->imagePreviewHeight('180')
                    ->imageEditor()
                    ->downloadable()
                    ->openable(),
                Forms\Components\Toggle::make('is_active')->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('company'),
            Tables\Columns\TextColumn::make('duration'),
            Tables\Columns\TextColumn::make('type')->label('Pay')->badge()
                ->color(fn ($state) => $state === 'Paid' ? 'success' : 'warning'),
            Tables\Columns\TextColumn::make('category')->label('Group')->badge()
                ->formatStateUsing(fn ($state) => $state === 'summer' ? 'Summer' : 'Paid Internships')
                ->color(fn ($state) => $state === 'summer' ? 'info' : 'gray'),
            Tables\Columns\ToggleColumn::make('is_active'),
        ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->label('Group')
                    ->options(['regular' => 'Paid Internships', 'summer' => 'Summer Internship Programs']),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInternships::route('/'),
            'create' => Pages\CreateInternship::route('/create'),
            'edit' => Pages\EditInternship::route('/{record}/edit'),
        ];
    }
}
