<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseResource\Pages;
use App\Models\Course;
use App\Support\AdminChoices;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $navigationGroup = 'Skills & Courses';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Course Details')->schema([
                Forms\Components\Select::make('type')
                    ->options(['paid' => 'Premium (Paid)', 'navttc' => 'NAVTTC (Free)'])
                    ->required()
                    ->live(),
                Forms\Components\TextInput::make('title')->required()->maxLength(200),
                Forms\Components\Select::make('icon_name')
                    ->label('Icon')
                    ->helperText('Shown on this course card.')
                    ->options(AdminChoices::icons())
                    ->searchable()
                    ->required(),
                Forms\Components\Textarea::make('description')->rows(3)->maxLength(500),
            ])->columns(2),

            Forms\Components\Section::make('Pricing & Stats')->schema([
                Forms\Components\TextInput::make('duration')->required()->placeholder('6 Months'),
                Forms\Components\TextInput::make('students_count')->required()->placeholder('450+'),
                Forms\Components\TextInput::make('price')
                    ->placeholder('PKR 45,000')
                    ->helperText('Leave blank for NAVTTC free courses'),
                Forms\Components\TextInput::make('tag')->placeholder('Bestseller, New, Popular'),
                Forms\Components\Select::make('color_class')
                    ->label('Colour')
                    ->helperText('Background colour of the icon badge.')
                    ->options(AdminChoices::colors())
                    ->default('bg-blue-50 text-blue-600'),
            ])->columns(3),

            /*
             * These two, and the equivalent list fields on jobs, services,
             * internships, destinations and language programs, are stored as a flat
             * array of strings. They were built as ordinary repeaters wrapping a
             * field named `item`, which expects rows shaped [['item' => '…']] — so
             * opening an existing course handed the repeater a list of plain strings
             * it could not read, and every row rendered blank. That is the
             * "admin form clears when updating courses" report: the data was intact
             * the whole time, but saving from that screen wrote the empty rows back.
             *
             * `simple()` is the repeater that reads and writes flat scalars.
             */
            Forms\Components\Section::make('Curriculum')->schema([
                Forms\Components\Repeater::make('what_you_learn')
                    ->label('What You\'ll Learn')
                    ->simple(Forms\Components\TextInput::make('item')->required())
                    ->defaultItems(4),
                Forms\Components\Repeater::make('highlights')
                    ->label('Program Highlights')
                    ->simple(Forms\Components\TextInput::make('item')->required())
                    ->defaultItems(4),
            ])->columns(2),

            Forms\Components\Section::make('Files & Status')->schema([
                Forms\Components\FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->directory('courses')
                    ->acceptedFileTypes(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/bmp', 'image/svg+xml'])
                    ->maxSize(2048)
                    ->imagePreviewHeight('180')
                    ->imageEditor()
                    ->downloadable()
                    ->openable(),
                Forms\Components\FileUpload::make('pdf_brochure')
                    ->label('Course Brochure (PDF)')
                    ->disk('public')
                    ->visibility('public')
                    ->acceptedFileTypes(['application/pdf'])
                    ->maxSize(8192)
                    ->directory('course-brochures'),
                Forms\Components\TextInput::make('sort_order')->numeric()->minValue(0)->maxValue(255)->default(0),
                Forms\Components\Toggle::make('is_active')->default(true),
            ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')
            ->columns([
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->color(fn ($state) => $state === 'paid' ? 'primary' : 'success'),
                Tables\Columns\TextColumn::make('title')->searchable()->limit(35),
                Tables\Columns\TextColumn::make('duration'),
                Tables\Columns\TextColumn::make('price'),
                Tables\Columns\TextColumn::make('students_count'),
                Tables\Columns\ToggleColumn::make('is_active'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options(['paid' => 'Paid', 'navttc' => 'NAVTTC']),
            ])
            ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()])
            ->bulkActions([Tables\Actions\BulkActionGroup::make([Tables\Actions\DeleteBulkAction::make()])]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit' => Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}
