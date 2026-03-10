# Django Admin Tabs

A Django admin extension that adds smart navigation tabs to help you quickly switch between recently visited admin pages.

**Zero Configuration Required** - Just install and it works!

## Features

- **Zero Configuration** - Works out of the box with automatic setup
- **Smart Tab Navigation** - Automatically maintains a tab bar of your recent admin pages
- **Quick Page Switching** - Click any tab to instantly jump to that page
- **Close Tabs** - Remove individual tabs with a click
- **Persistent Tabs** - Your tabs survive page refreshes (stored in browser)
- **Theme Compatible** - Automatically adapts to Django Admin's color scheme
- **Custom Theme Support** - Works with django-admin-interface, django-jazzmin, etc.
- **No Layout Jump** - Seamless page transitions without visual flicker

## Requirements

- Python 3.8+
- Django 3.2+

## Installation

```bash
pip install django-nav-toolbar
```

Or install from source:

```bash
pip install git+https://github.com/lazyjean/django-nav-toolbar.git
```

## Usage

### 1. Add to INSTALLED_APPS

```python
INSTALLED_APPS = [
    'nav_toolbar',
    'django.contrib.admin',
    # ... your other apps
]
```

**Note**: No special ordering required - `nav_toolbar` can be placed anywhere in `INSTALLED_APPS`.

### 2. Collect Static Files

```bash
python manage.py collectstatic
```

### 3. Run Your Project

```bash
python manage.py runserver
```

Navigate to Django admin, and you'll see the tabs bar at the top of the page!

## How It Works

As you navigate through different admin pages, **Django Admin Tabs** automatically maintains a tab bar showing your recent pages. This allows you to:

- **Quickly switch** between different admin sections without using the back button
- **Keep context** of where you've been working
- **Access previous pages** with a single click

The tabs are automatically managed based on your navigation patterns.

## Configuration (Optional)

Currently, the package uses fixed default values. Advanced configuration support is planned for future releases.

### Current Defaults

| Option | Default | Description |
|--------|---------|-------------|
| `MAX_ITEMS` | 20 | Maximum number of tabs to display |
| `STORAGE_KEY` | `'admin_tabs_'` | Browser storage key prefix (includes hostname) |

## Technical Details

### Automatic Middleware Injection

This package uses Django middleware to automatically inject CSS/JS into admin pages:

1. **CSS Injection**: The middleware adds the tabs stylesheet to the `<head>` section
2. **Container Pre-insertion**: An empty container is inserted after the admin header to prevent layout jumps
3. **JavaScript Injection**: The tabs script is added before the closing `</body>` tag
4. **Dynamic Content**: JavaScript fills the pre-inserted container with tab data

This approach ensures:
- **Zero configuration** - No template modifications or INSTALLED_APPS ordering required
- **Universal compatibility** - Works with any admin theme or customization
- **No visual jumps** - Container exists before page render completes
- **Automatic middleware registration** - Added automatically by the app config

### Theme Compatibility

The package uses CSS variables to automatically match your admin theme:

**Django Admin Interface Variables:**
- `--admin-interface-header-background-color` - Header/tabs bar background
- `--admin-interface-header-text-color` - Active tab text
- `--admin-interface-module-background-color` - Module colors
- `--admin-interface-module-link-color` - Link colors

**Fallback to Django Admin Variables:**
- `--primary` - Primary color
- `--header-bg` - Header background
- `--body-bg` - Background color

If you have a custom admin theme, the tabs will automatically adapt to match your design.

## Troubleshooting

### Tabs not showing

1. **Check INSTALLED_APPS order**: Ensure `nav_toolbar` comes **before** `django.contrib.admin`
2. **Run collectstatic**: Make sure static files are collected
3. **Clear browser cache**: Hard refresh the admin page (Ctrl+F5 or Cmd+Shift+R)

### Warning about INSTALLED_APPS order

If you see a warning like:
```
UserWarning: nav_toolbar should be placed BEFORE django.contrib.admin...
```

Simply reorder your `INSTALLED_APPS` as shown in the Usage section above.

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/lazyjean/django-nav-toolbar.git
cd django-nav-toolbar

# Install in development mode
pip install -e .

# Run the example project
cd example
python manage.py migrate
python manage.py runserver
```

### Code Quality

```bash
# Linting
ruff check nav_toolbar/

# Formatting
ruff format nav_toolbar/
```

### Testing

```bash
# Run tests
python -m pytest

# Or with Django's test runner
python manage.py test
```

## License

MIT License - see [LICENSE](LICENSE) for details.
