(function() {
    const STORAGE_KEY = 'admin_tabs_' + window.location.hostname.replace(/\./g, '_');
    const MAX_ITEMS = 20;

    function getTabs() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    }

    function saveTabs(tabs) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    }

    function getPageTitle() {
        const breadcrumb = document.querySelector('.breadcrumbs');
        if (breadcrumb) {
            const items = breadcrumb.querySelectorAll('a');

            if (items.length > 0) {
                const pathParts = [];
                items.forEach(function(item) {
                    const text = item.textContent.trim();
                    if (text && text !== 'Home') {
                        pathParts.push(text);
                    }
                });

                const breadcrumbText = breadcrumb.textContent;
                const lastLink = items[items.length - 1];
                const afterLastLink = breadcrumbText.substring(
                    breadcrumbText.indexOf(lastLink.textContent) + lastLink.textContent.length
                ).trim();

                if (afterLastLink) {
                    const currentPage = afterLastLink.replace(/^[›\s]+/, '').split('›')[0].trim();
                    if (currentPage && currentPage !== pathParts[pathParts.length - 1]) {
                        pathParts.push(currentPage);
                    }
                }

                if (pathParts.length > 0) {
                    return pathParts.join(' › ');
                }
            }
        }

        const header = document.querySelector('h1');
        return header ? header.textContent.trim() : 'Unknown Page';
    }

    function buildTabItem(item, isActive) {
        const div = document.createElement('a');
        div.className = 'admin-tab-item' + (isActive ? ' active' : '');
        div.href = item.url;
        div.title = item.url;
        div.innerHTML = `
            <span>${item.title}</span>
            <span class="admin-tab-close" data-url="${item.url}">&times;</span>
        `;
        return div;
    }

    function renderTabs() {
        const container = document.getElementById('admin-tabs-scroll');
        if (!container) return;

        const tabs = getTabs();
        const currentUrl = window.location.pathname + window.location.search;

        container.innerHTML = '';

        tabs.forEach((item) => {
            const el = buildTabItem(item, item.url === currentUrl);
            el.querySelector('.admin-tab-close').addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                removeTab(item.url);
            });
            container.appendChild(el);
        });
    }

    function addCurrentPage() {
        const url = window.location.pathname + window.location.search;
        if (!url.includes('/admin/')) return;
        if (window.location.pathname === '/admin/login' || window.location.pathname.startsWith('/admin/login/')) {
            return;
        }

        const tabs = getTabs();
        const existingIndex = tabs.findIndex(t => t.url === url);

        if (existingIndex === -1) {
            const title = getPageTitle();
            tabs.push({ url: url, title: title, time: Date.now() });

            if (tabs.length > MAX_ITEMS) {
                tabs.shift();
            }
        }

        saveTabs(tabs);
        renderTabs();
    }

    function removeTab(url) {
        let tabs = getTabs();
        tabs = tabs.filter(t => t.url !== url);
        saveTabs(tabs);
        renderTabs();
    }

    function initTabsBar() {
        const pathname = window.location.pathname;
        if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
            return;
        }

        // Use pre-inserted container to avoid layout jump
        const bar = document.getElementById('admin-tabs-bar');
        if (!bar) {
            // Fallback: create container if not found
            const newBar = document.createElement('div');
            newBar.id = 'admin-tabs-bar';
            newBar.className = 'admin-interface';
            newBar.innerHTML = `<div id="admin-tabs-scroll"></div>`;
            
            const breadcrumbs = document.querySelector('#breadcrumbs');
            if (breadcrumbs) {
                breadcrumbs.parentNode.insertBefore(newBar, breadcrumbs.nextSibling);
            } else {
                const header = document.querySelector('#header');
                if (header) {
                    header.parentNode.insertBefore(newBar, header.nextSibling);
                } else {
                    document.body.appendChild(newBar);
                }
            }
        }

        bar.addEventListener('click', function(e) {
            if (e.target.classList.contains('admin-tab-item') && !e.target.classList.contains('admin-tab-close')) {
                e.preventDefault();
                window.location.href = e.target.href;
            }
        });

        renderTabs();

        if (document.readyState === 'complete') {
            addCurrentPage();
        } else {
            window.addEventListener('load', addCurrentPage);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabsBar);
    } else {
        initTabsBar();
    }
})();