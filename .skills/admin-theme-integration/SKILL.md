# Django Admin Theme Integration Skill

实现 Django Admin 扩展包的零配置集成（类似 django-admin-interface）。

## 功能

- 自动模板覆盖（利用 INSTALLED_APPS 顺序）
- Django Admin CSS 变量适配
- AppConfig 顺序检查警告
- 静默资源注入

## 使用方式

```bash
# 将当前包配置为零集成模式
/admin-theme-integration
```

## 实现步骤

### 1. 模板自动覆盖

创建 `templates/admin/base_site.html`：

```html
{% extends "admin/base.html" %}
{% load static %}

{% block extrahead %}
{{ block.super }}
<link rel="stylesheet" href="{% static 'your_app/your.css' %}">
{% endblock %}

{% block footer %}
{{ block.super }}
<script src="{% static 'your_app/your.js' %}"></script>
{% endblock %}
```

### 2. AppConfig 顺序检查

在 `apps.py` 中添加：

```python
from django.apps import AppConfig
import warnings

class YourAppConfig(AppConfig):
    name = "your_app"
    
    def ready(self):
        self._check_installed_apps_order()
    
    def _check_installed_apps_order(self):
        from django.conf import settings
        
        apps = [app.split('.')[-1] for app in settings.INSTALLED_APPS]
        try:
            app_idx = apps.index("your_app")
            admin_idx = apps.index("admin")
            if app_idx > admin_idx:
                warnings.warn(
                    "your_app should be placed BEFORE django.contrib.admin "
                    "in INSTALLED_APPS",
                    UserWarning
                )
        except ValueError:
            pass
```

### 3. CSS 变量适配

使用 Django Admin 内置 CSS 变量：

```css
.my-element {
    background: var(--body-bg, #f0f0f0);
    color: var(--body-fg, #333);
    border-color: var(--border-color, #ccc);
}

.my-element.active {
    background: var(--primary, #417690);
    color: var(--header-link-color, #fff);
}
```

### 4. 用户配置说明

用户只需：

```python
INSTALLED_APPS = [
    'your_app',        # 必须在 admin 之前
    'django.contrib.admin',
]
```

## 注意事项

- 模板必须放在 `templates/admin/base_site.html`
- 静态文件放在 `static/your_app/`
- 需要 `APP_DIRS: True` 在 TEMPLATES 配置中
