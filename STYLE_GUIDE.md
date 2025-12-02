# Style Guide

## Colors
- **Primary**: Indigo 600 (`bg-indigo-600`, `text-indigo-600`) -> Hover: Indigo 700
- **Secondary**: Gray 100 (`bg-gray-100`, `text-gray-900`) -> Hover: Gray 200
- **Background**: 
    - Light: Gray 50 (`bg-gray-50`)
    - Dark: Gray 900 (`dark:bg-gray-900`)
- **Text**: 
    - Light: Gray 900 (Headings), Gray 600 (Body)
    - Dark: Gray 100 (Headings), Gray 300 (Body)

## Typography
- **Font**: Inter (Next.js default)
- **Headings**: Bold / ExtraBold
- **Body**: Regular / Medium

## Components

### Buttons
All buttons should use the `Button` component in `components/ui/Button.tsx`.

- **Primary**: Solid Indigo background, White text. Used for main actions (Login, Sign Up, Start Timer).
- **Secondary**: Gray background, Dark text. Used for secondary actions (Cancel, Back).
- **Outline**: Transparent background, Indigo border/text. Used for alternative actions.
- **Ghost**: Transparent background, Dark text. Used for subtle actions (Logout icon).

### Spacing
- **Page Padding**: `px-4 sm:px-6 lg:px-8`
- **Section Spacing**: `py-12` or `py-24`
