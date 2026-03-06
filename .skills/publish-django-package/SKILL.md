# Django Package Publish Skill

发布 Django 包到 PyPI 的完整流程。

## 功能

- 构建 wheel 和 sdist 包
- 上传到 PyPI
- 验证发布结果

## 使用方式

```bash
# 发布当前目录的 Django 包
/publish-django-package

# 指定版本号发布
/publish-django-package 1.0.0
```

## 前置要求

1. PyPI 账户和 API Token
2. 已配置 `~/.pypirc` 文件：
   ```
   [pypi]
   username = __token__
   password = pypi-AgEI...
   ```
3. 安装发布工具：`pip install twine build`

## 实现步骤

### 1. 构建包
```bash
rm -rf dist/ build/ *.egg-info
python -m build
```

### 2. 上传到 PyPI
```bash
twine upload dist/*
```

### 3. 验证
- 检查 PyPI 页面
- 尝试 pip install

## 注意事项

- 确保 `pyproject.toml` 配置正确
- 版本号需要在 `__init__.py` 和 `pyproject.toml` 中一致
- 首次发布需要先在 PyPI 创建项目
