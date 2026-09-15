<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use App\Support\AdminChoices;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-squares-2x2';

    protected static ?string $navigationGroup = 'Home Page';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('icon_name')
                ->label('Icon')
                ->helperText('Shown on this service card.')
                ->options(AdminChoices::icons())
                ->searchable()
                ->required(),
            Forms\Components\TextInput::make('title')->required()->maxLength(200),
            Forms\Components\FileUpload::make('image')
                ->label('Card image')
                ->helperText('Shown at the top of the card. Landscape works best.')
                ->image()
                ->disk('public')
                ->visibility('public')
                ->directory('services')
                ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'])
                ->maxSize(2048)
                ->imagePreviewHeight('160')
                ->imageEditor()
                ->columnSpanFull(),
            Forms\Components\Select::make('color_class')
                ->label('Colour')
                ->helperText('Background colour of the icon badge.')
                ->options(AdminChoices::colors())
                ->default('bg-blue-50 text-blue-600'),
            Forms\Components\Textarea::make('description')->required()->rows(3)->columnSpanFull(),
            Forms\Components\Textarea::make('details')->required()->rows(5)->columnSpanFull(),
            Forms\Components\TextInput::make('link_url')
                ->label('Card links to')
                ->helperText('Where clicking this card on the home page takes the visitor — for example /skills or /study-abroad. Leave empty to open the details panel instead.')
                ->maxLength(500)
                ->placeholder('/skills')
                ->columnSpanFull(),
            Forms\Components\Repeater::make('key_benefits')
                ->simple(Forms\Components\TextInput::make('item')->required())
                ->defaultItems(3)
                
                ->columnSpanFull(),
            Forms\Components\TextInput::make('sort_order')->numeric()->minValue(0)->maxValue(255)->default(0),
            Forms\Components\FileUpload::make('pdf_brochure')
                ->label('Service Brochure (PDF)')
                ->helperText('Optional. Offered as a download in the details panel on the website.')
                ->disk('public')
                ->visibility('public')
                ->acceptedFileTypes(['application/pdf'])
                ->maxSize(8192)
                ->directory('brochures')
                ->downloadable()
                ->openable(),
            Forms\Components\Toggle::make('is_active')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->reorderable('sort_order')->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('icon_name'),
            Tables\Columns\TextColumn::make('sort_order')->sortable(),
            Tables\Columns\ToggleColumn::make('is_active'),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
