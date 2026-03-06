# Django Package Rename Skill

重命名 Django 包项目（包名、目录、PyPI、GitHub）。

## 功能

- 重命名 Python 包目录
- 更新 pyproject.toml 配置
- 更新所有 Python 引用
- 更新 README 文档
- 重命名 GitHub 仓库
- 构建并发布新包

## 使用方式

```bash
# 重命名项目
/rename-django-project new-package-name

# 示例
/rename-django-project django-nav-toolbar
```

## 前置要求

1. GitHub CLI (`gh`) 已安装并登录
2. PyPI API Token 已配置
3. 当前目录为 Django 包根目录

## 实现步骤

### 1. 重命名包目录
```bash
# 假设旧包名为 django_old_name，新包名为 django_new_name
# Python 包名为 new_name
mv old_name new_name
```

### 2. 更新 pyproject.toml
- `name`: 改为 `django-new-name` 格式
- `include`: 改为 `new_name*`
- `known-first-party`: 改为 `new_name`
- `project.urls`: 更新 GitHub 链接

### 3. 更新 Python 文件
- `__init__.py`: 无需修改（包版本）
- `apps.py`: 更新 `name` 和 `verbose_name`
- 模板文件: 更新 static 路径引用
- `settings.py`: 更新 INSTALLED_APPS

### 4. 更新 README
- 替换所有包名引用
- 更新安装命令
- 更新克隆 URL

### 5. 重命名 GitHub 仓库
```bash
gh repo rename new-repo-name --yes
```

### 6. 构建并发布
```bash
rm -rf dist/ build/ *.egg-info
python -m build
twine upload dist/*
```

## 注意事项

- 旧包名可能已被占用（如 PyPI）
- 需要确认新名称可用后再操作
- 建议先测试构建再发布
