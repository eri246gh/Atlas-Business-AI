/**
 * ATLAS BUSINESS AI - DASHBOARD MODULE
 * Gerencia sidebar, navegação, busca e ações do usuário
 */

const Dashboard = {
    /**
     * Inicializa o dashboard
     */
    init() {
        this.loadTheme();
        this.setupSidebar();
        this.setupSearch();
        this.setupMobileMenu();
        this.loadUserInfo();
        this.setupLogout();
        this.highlightCurrentNav();
    },

    /**
     * Carrega o tema salvo
     */
    loadTheme() {
        const saved = localStorage.getItem('atlas-theme-preference');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }
    },

    /**
     * Configura navegação da sidebar
     */
    setupSidebar() {
        const links = document.querySelectorAll('.sidebar-link');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') return; // deixa navegar

                // Remove ativo de todos
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    },

    /**
     * Destaca o link ativo baseado na URL atual
     */
    highlightCurrentNav() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.sidebar-link');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    },

    /**
     * Configura busca simples (simulada)
     */
    setupSearch() {
        const searchInput = document.querySelector('.topbar-search input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const term = searchInput.value.trim();
                    if (term) {
                        alert(`Busca por "${term}" será implementada em breve.`);
                    }
                }
            });
        }
    },

    /**
     * Menu mobile: abre/fecha sidebar
     */
    setupMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('menuOverlay');

        if (menuBtn && sidebar) {
            menuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                overlay?.classList.toggle('show');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            });
        }
    },

    /**
     * Carrega informações do usuário da sessão simulada
     */
    loadUserInfo() {
        const userData = JSON.parse(localStorage.getItem('atlas-user') || '{}');
        const nameEl = document.getElementById('sidebarUserName');
        const planEl = document.getElementById('sidebarUserPlan');
        const avatarEl = document.getElementById('sidebarAvatar');

        if (nameEl && userData.name) {
            nameEl.textContent = userData.name;
        }
        if (planEl) {
            planEl.textContent = 'Plano Starter';
        }
        if (avatarEl && userData.name) {
            const initials = userData.name
                .split(' ')
                .map(n => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
            avatarEl.textContent = initials;
        }
    },

    /**
     * Configura logout
     */
    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('atlas-user');
                localStorage.removeItem('atlas-token');
                window.location.href = 'login.html';
            });
        }
    },

    /**
     * Alterna tema (se botão presente no topo)
     */
    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('atlas-theme-preference', newTheme);
    }
};

document.addEventListener('DOMContentLoaded', () => Dashboard.init());
