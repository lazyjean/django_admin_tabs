# AGENTS.md - Development Guide for django_admin_tabs

## Project Overview

This is a Django package providing tabbed admin interfaces. The project structure follows standard Django app layout.

## Build / Test Commands

### Running Tests

```bash
# Run all tests
python -m pytest

# Or using Django's test runner
python manage.py test

# Run a single test (specify full path)
python -m pytest django_admin_tabs/tests.py::TestClassName::test_method_name
python manage.py test django_admin_tabs.tests.TestClassName.test_method_name
```

### Code Quality

```bash
# Linting and formatting (ruff)
ruff check django_admin_tabs/

# Format code (ruff)
ruff format django_admin_tabs/
```

### Development

```bash
# Install package in development mode
pip install -e .

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

## Code Style Guidelines

### Python Style

- **Follow PEP 8** with 100 character line limit
- Use **Ruff** for formatting and linting (line length 100)

### Imports

```python
# Standard library imports first
import os
from typing import Optional

# Third-party imports
from django.contrib import admin
from django.db import models

# Local imports
from .models import MyModel
```

### Naming Conventions

- **Classes**: `PascalCase` (e.g., `TabAdmin`)
- **Functions/variables**: `snake_case` (e.g., `get_tabs`, `tab_list`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_TABS`)
- **Private methods**: leading underscore (e.g., `_render_tabs`)

### Type Hints

Use type hints for function signatures:

```python
def get_tab_config(admin_class: type, request: HttpRequest) -> list[dict]:
    ...
```

### Error Handling

- Use specific exception types
- Log errors appropriately
- Return meaningful error messages
- Avoid bare `except:` clauses

### Django Specific

- Use Django's `gettext` for internationalization
- Follow Django admin conventions
- Use Django's template inheritance
- Keep business logic out of templates

### JavaScript

- Use vanilla JS or a lightweight framework
- Follow existing JS patterns in the codebase
- Keep JS minimal and focused

### CSS

- Follow existing CSS patterns
- Use meaningful class names
- Keep styles modular

## Project Structure

```
django_admin_tabs/
├── __init__.py
├── admin.py         # Admin configurations
├── apps.py          # App config
├── models.py        # Database models
├── tests.py         # Unit tests
├── views.py         # Views
├── migrations/      # Database migrations
└── static/          # Static files (CSS, JS)
    └── django_admin_tabs/
        ├── history.css
        └── history.js
```

## Testing Guidelines

- Write tests for all new features
- Use Django's `TestCase` class
- Include both unit tests and integration tests
- Test edge cases and error conditions

## Git Conventions

- Use descriptive commit messages
- Create feature branches for new features
- Run linting before committing
- Ensure tests pass before pushing
