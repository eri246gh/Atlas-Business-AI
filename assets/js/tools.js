/**
 * ATLAS BUSINESS AI - TOOLS MODULE
 * Funções compartilhadas entre todas as ferramentas
 */

const Tools = {
    /**
     * Inicializa configurações comuns da página de ferramenta
     */
    init() {
        this.loadTheme();
        this.setupMobileMenu();
        this.loadUserInfo();
    },

    /**
     * Carrega tema
     */
    loadTheme() {
        const saved = localStorage.getItem('atlas-theme-preference');
        if (saved) document.documentElement.setAttribute('data-theme', saved);
    },

    /**
     * Menu mobile
     */
    setupMobileMenu() {
        const btn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('menuOverlay');
        if (btn && sidebar) {
            btn.addEventListener('click', () => {
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
     * Carrega nome do usuário
     */
    loadUserInfo() {
        const user = JSON.parse(localStorage.getItem('atlas-user') || '{}');
        const nameEl = document.getElementById('sidebarUserName');
        const avatarEl = document.getElementById('sidebarAvatar');
        if (nameEl && user.name) nameEl.textContent = user.name;
        if (avatarEl && user.name) {
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
            avatarEl.textContent = initials;
        }
    },

    /**
     * Exibe estado de carregamento no botão
     */
    showLoading(button) {
        if (!button) return;
        button.disabled = true;
        const originalHTML = button.innerHTML;
        button.dataset.original = originalHTML;
        button.innerHTML = '<span class="spinner"></span> Gerando...';
        return () => {
            button.disabled = false;
            button.innerHTML = originalHTML;
        };
    },

    /**
     * Copia texto para área de transferência
     */
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Copiado com sucesso!', 'success');
        }).catch(() => {
            this.showToast('Erro ao copiar.', 'error');
        });
    },

    /**
     * Exporta conteúdo como arquivo TXT (futuramente PDF/Word)
     */
    downloadFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * Simula geração de IA (placeholder - será substituído por API)
     */
    simulateAIGeneration(formData) {
        // Esta função será customizada em cada ferramenta
        return 'Conteúdo gerado com sucesso.';
    },

    /**
     * Toast de feedback
     */
    showToast(message, type = 'info') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    },

    /**
     * Volta ao dashboard
     */
    goToDashboard() {
        window.location.href = '../dashboard.html';
    }
};
