/**
 * ATLAS BUSINESS AI - AUTH MODULE
 * Gerencia login, cadastro, recuperação e validação
 * Simula autenticação (futuro: integrar com API real)
 */

const Auth = {
    /**
     * Inicializa tema e eventos da página de autenticação
     */
    init() {
        this.loadTheme();
        this.setupThemeToggle();
        this.setupFormValidation();
    },

    /**
     * Carrega tema salvo
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('atlas-theme-preference');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    },

    /**
     * Alterna tema
     */
    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('atlas-theme-preference', newTheme);
    },

    /**
     * Configura botão de tema
     */
    setupThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (btn) {
            btn.addEventListener('click', () => this.toggleTheme());
        }
    },

    /**
     * Configura validação e submissão dos formulários
     */
    setupFormValidation() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const recoveryForm = document.getElementById('recoveryForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
        if (recoveryForm) {
            recoveryForm.addEventListener('submit', (e) => this.handleRecovery(e));
        }
    },

    /**
     * Valida e processa login
     */
    handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value;

        // Validação simples
        if (!email || !password) {
            this.showToast('Preencha todos os campos.', 'error');
            return;
        }
        if (!this.isValidEmail(email)) {
            this.showToast('E-mail inválido.', 'error');
            return;
        }

        // Simula login (substituir por API real)
        this.simulateLoading(form.querySelector('button[type="submit"]'));
        setTimeout(() => {
            this.setSession({ email, name: email.split('@')[0] });
            window.location.href = 'dashboard.html';
        }, 1200);
    },

    /**
     * Valida e processa cadastro
     */
    handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            this.showToast('Preencha todos os campos.', 'error');
            return;
        }
        if (!this.isValidEmail(email)) {
            this.showToast('E-mail inválido.', 'error');
            return;
        }
        if (password.length < 6) {
            this.showToast('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }
        if (password !== confirmPassword) {
            this.showToast('As senhas não coincidem.', 'error');
            return;
        }

        this.simulateLoading(form.querySelector('button[type="submit"]'));
        setTimeout(() => {
            this.setSession({ email, name });
            window.location.href = 'dashboard.html';
        }, 1200);
    },

    /**
     * Processa recuperação de senha
     */
    handleRecovery(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('#email').value.trim();

        if (!email || !this.isValidEmail(email)) {
            this.showToast('Informe um e-mail válido.', 'error');
            return;
        }

        this.simulateLoading(form.querySelector('button[type="submit"]'));
        setTimeout(() => {
            this.showToast('E-mail de recuperação enviado! Verifique sua caixa de entrada.', 'success');
            form.reset();
        }, 1500);
    },

    /**
     * Valida formato de e-mail
     */
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    /**
     * Simula estado de carregamento no botão
     */
    simulateLoading(button) {
        if (!button) return;
        button.disabled = true;
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="spinner"></span> Aguarde...';
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = originalText;
        }, 2000);
    },

    /**
     * Salva sessão simulada no localStorage
     */
    setSession(user) {
        localStorage.setItem('atlas-user', JSON.stringify(user));
        localStorage.setItem('atlas-token', 'simulated-jwt-token');
    },

    /**
     * Exibe toast de feedback
     */
    showToast(message, type = 'info') {
        // Remove toasts existentes
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
    }
};

document.addEventListener('DOMContentLoaded', () => Auth.init());
