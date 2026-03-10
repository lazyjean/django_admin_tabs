class NavToolbarMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if not request.path.startswith("/admin/"):
            return response

        if not getattr(response, "content", b""):
            return response

        content_type = response.get("Content-Type", "")
        if not content_type.startswith("text/html"):
            return response

        try:
            content = response.content.decode("utf-8")
        except UnicodeDecodeError:
            return response

        if "</head>" in content:
            import time

            version = int(time.time())
            css = f'<link rel="stylesheet" href="/static/nav_toolbar/tabs.css?v={version}">'
            content = content.replace("</head>", css + "</head>")

        # Pre-insert empty container to avoid layout jump
        # Insert after header for proper positioning
        container_html = '<div id="admin-tabs-bar" class="admin-interface"><div id="admin-tabs-scroll"></div></div>'

        # Try multiple insertion points in order of preference
        # Priority 1: After closing header tag (best for admin-interface theme)
        if "</header>" in content:
            content = content.replace("</header>", "</header>" + container_html)
        elif '<div id="breadcrumbs">' in content:
            # Insert before breadcrumbs (inside container, after header)
            content = content.replace(
                '<div id="breadcrumbs">', container_html + '<div id="breadcrumbs">'
            )
        elif '<div id="container">' in content:
            # Fallback: insert right after container starts
            content = content.replace(
                '<div id="container">', '<div id="container">' + container_html
            )

        if "</body>" in content:
            js = '<script src="/static/nav_toolbar/tabs.js"></script>'
            content = content.replace("</body>", js + "</body>")

        response.content = content.encode("utf-8")
        return response
