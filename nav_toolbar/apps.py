import warnings

from django.apps import AppConfig


class NavToolbarConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "nav_toolbar"
    verbose_name = "Nav Toolbar"

    def ready(self):
        self._check_installed_apps_order()
        self._inject_middleware()

    def _check_installed_apps_order(self):
        """Check that nav_toolbar comes before django.contrib.admin"""
        from django.conf import settings

        apps = []
        for app in settings.INSTALLED_APPS:
            if isinstance(app, str):
                apps.append(app)
            else:
                apps.append(app.name)

        try:
            toolbar_idx = apps.index("nav_toolbar")
            admin_idx = apps.index("django.contrib.admin")
            if toolbar_idx > admin_idx:
                warnings.warn(
                    "nav_toolbar should be placed BEFORE django.contrib.admin "
                    "in INSTALLED_APPS to ensure proper template loading. "
                    "Please reorder your INSTALLED_APPS setting.",
                    UserWarning,
                    stacklevel=2,
                )
        except ValueError:
            pass

    def _inject_middleware(self):
        """Automatically inject middleware for zero-configuration"""
        from django.conf import settings

        middleware_path = "nav_toolbar.middleware.NavToolbarMiddleware"

        if middleware_path not in settings.MIDDLEWARE:
            settings.MIDDLEWARE = list(settings.MIDDLEWARE) + [middleware_path]
