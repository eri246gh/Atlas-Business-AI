/**
 * ATLAS BUSINESS AI - MAIN JAVASCRIPT
 * Gerencia navegação, tema, animações, FAQ e interações da landing page
 */

// --- Módulo: Gerenciamento de Tema ---
const ThemeManager = {
    STORAGE_KEY: 'atlas-theme-preference',

    /**
     * Inicializa o tema baseado na preferência salva ou do sistema
     */
    init() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            // Detecta preferência do sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
    },

    /**
     * Alterna entre tema claro e escuro
     */
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(this.STORAGE_KEY, newTheme);
    },

    /**
     * Retorna o tema atual
     * @returns {string} 'light' ou 'dark'
     */
    getCurrent() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
};

// --- Módulo: Navbar ---
const Navbar = {
    /**
     * Inicializa eventos da navbar
     */
    init() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');

        // Efeito de scroll na navbar
        window.addEventListener('scroll', () => this.handleScroll());

        // Menu mobile
        this.mobileMenuBtn?.addEventListener('click', () => this.toggleMobileMenu());

        // Fecha menu mobile ao clicar em um link
        this.navLinks?.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Fecha menu mobile ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.mobileMenuBtn && !this.mobileMenuBtn.contains(e.target) && 
                this.navLinks && !this.navLinks.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    },

    /**
     * Adiciona/remove classe de scroll na navbar
     */
    handleScroll() {
        if (window.scrollY > 10) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    },

    /**
     * Alterna menu mobile
     */
    toggleMobileMenu() {
        this.navLinks?.classList.toggle('active');
        const isExpanded = this.navLinks?.classList.contains('active');
        this.mobileMenuBtn?.setAttribute('aria-expanded', isExpanded);
    },

    /**
     * Fecha menu mobile
     */
    closeMobileMenu() {
        this.navLinks?.classList.remove('active');
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    }
};

// --- Módulo: FAQ Accordion ---
const FAQ = {
    /**
     * Inicializa comportamento accordion do FAQ
     */
    init() {
        const questions = document.querySelectorAll('.faq-question');
        questions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                const isActive = faqItem.classList.contains('active');

                // Fecha todos os itens
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                // Abre o item clicado (se não estava ativo)
                if (!isActive) {
                    faqItem.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
};

// --- Módulo: Animações de Scroll (AOS simplificado) ---
const ScrollAnimations = {
    /**
     * Inicializa animações ao scroll usando IntersectionObserver
     */
    init() {
        const elements = document.querySelectorAll('[data-aos]');

        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.getAttribute('data-aos') || 'fade-up';
                    const delay = el.getAttribute('data-aos-delay') || 0;

                    setTimeout(() => {
                        el.style.animation = `${animation} 0.6s ease-out forwards`;
                        el.style.opacity = '1';
                    }, parseInt(delay));

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }
};

// --- Módulo: Smooth Scroll para links âncora ---
const SmoothScroll = {
    /**
     * Inicializa smooth scroll para links internos
     */
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 68;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// --- Inicialização Geral ---
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa tema
    ThemeManager.init();

    // Configura botão de alternância de tema
    const themeToggle = document.getElementById('themeToggle');
    themeToggle?.addEventListener('click', () => ThemeManager.toggle());

    // Inicializa módulos
    Navbar.init();
    FAQ.init();
    ScrollAnimations.init();
    SmoothScroll.init();

    // Verifica estado inicial do scroll
    if (window.scrollY > 10) {
        document.getElementById('navbar')?.classList.add('scrolled');
    }
});
