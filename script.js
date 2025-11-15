// script.js - Premium Protected Portfolio with Enhanced Features
(function(){
    'use strict';

    // Enhanced Security System
    class SecuritySystem {
        constructor() {
            this.init();
        }

        init() {
            this.protectContent();
            this.antiScreenCapture();
            this.setupEnhancedProtection();
        }

        protectContent() {
            // Prevent context menu only for images
            document.addEventListener('contextmenu', (e) => {
                if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    this.showWarning('Контекстное меню для изображений отключено');
                    return false;
                }
            });

            // Prevent image drag
            document.addEventListener('dragstart', (e) => {
                if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    this.showWarning('Перетаскивание изображений запрещено');
                    return false;
                }
            });

            // Prevent copy for specific elements
            document.addEventListener('copy', (e) => {
                if (e.target.classList.contains('protected-content')) {
                    e.preventDefault();
                    this.showWarning('Копирование этого содержимого запрещено');
                    return false;
                }
            });
        }

        antiScreenCapture() {
            // Blur content on print screen attempt
            document.addEventListener('keydown', (e) => {
                if (e.key === 'PrintScreen') {
                    e.preventDefault();
                    document.body.classList.add('blurred');
                    setTimeout(() => {
                        document.body.classList.remove('blurred');
                    }, 2000);
                    this.showWarning('Скриншот заблокирован');
                    return false;
                }
            });
        }

        setupEnhancedProtection() {
            // Защита от горячих клавиш для скриншотов
            document.addEventListener('keydown', (e) => {
                // Windows + Shift + S, Cmd + Shift + 3/4 и т.д.
                if ((e.ctrlKey && e.shiftKey && e.key === 'S') ||
                    (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4'))) {
                    e.preventDefault();
                this.showWarning('Создание скриншотов ограничено');
                return false;
                    }
            });

            // Защита от вставки изображений
            document.addEventListener('paste', (e) => {
                if (e.clipboardData && e.clipboardData.items) {
                    for (let item of e.clipboardData.items) {
                        if (item.type.indexOf('image') !== -1) {
                            e.preventDefault();
                            this.showWarning('Вставка изображений запрещена');
                            return false;
                        }
                    }
                }
            });
        }

        showWarning(message) {
            const warning = document.createElement('div');
            warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 10px 30px rgba(255, 71, 87, 0.3);
            border-left: 4px solid #ff0000;
            max-width: 300px;
            font-weight: 500;
            `;
            warning.textContent = message;
            document.body.appendChild(warning);

            setTimeout(() => {
                if (document.body.contains(warning)) {
                    document.body.removeChild(warning);
                }
            }, 3000);
        }
    }

    // Main Portfolio Application
    class PortfolioApp {
        constructor() {
            this.security = new SecuritySystem();
            this.currentTestimonial = 0;
            this.init();
        }

        init() {
            this.setupPreloader();
            this.setupNavigation();
            this.setupEnhancedNavigation();
            this.setupEnhancedThemeToggle();
            this.setupAnimations();
            this.setupCounters();
            this.setupParticles();
            this.setupEnhancedModal();
            this.setupImageProtection();
            this.setupContactForm();
            this.setupFloatingActions();
            this.setupBackToTop();
            this.setupProgressBar();
            this.setupTypewriter();
            this.setupMap();
            this.updateCopyright();
            this.setupConsoleGreeting();
            this.setupParallax();
            this.cleanupTestimonials();
            this.setupEnhancedFeatures();
        }

        setupPreloader() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.querySelector('.preloader').classList.add('loaded');
                }, 1000);
            });
        }

        setupNavigation() {
            const nav = document.querySelector('.floating-nav');
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');

            // Sticky navigation
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            // Mobile menu toggle
            if (navToggle) {
                navToggle.addEventListener('click', () => {
                    navToggle.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
            }

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navToggle.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                });
            });

            // Smooth scroll for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        setupEnhancedNavigation() {
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Добавляем индикацию активного раздела
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });
        }

        setupEnhancedThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('.theme-icon');
            const themeText = themeToggle.querySelector('.theme-text');

            const updateThemeUI = (theme) => {
                if (theme === 'dark') {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                    themeText.textContent = 'Светлая тема';
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                    themeText.textContent = 'Тёмная тема';
                }
            };

            // Check for saved theme or prefer color scheme
            const savedTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
            document.documentElement.setAttribute('data-theme', currentTheme);
            updateThemeUI(currentTheme);

            themeToggle.addEventListener('click', () => {
                currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', currentTheme);
                localStorage.setItem('theme', currentTheme);
                updateThemeUI(currentTheme);
            });
        }

        setupAnimations() {
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');

                        // Animate skill bars
                        if (entry.target.classList.contains('skill-progress')) {
                            const level = entry.target.getAttribute('data-level');
                            setTimeout(() => {
                                entry.target.style.width = level + '%';
                            }, 300);
                        }
                    }
                });
            }, observerOptions);

            // Observe all animated elements
            document.querySelectorAll('.section, .card, .service-card, .skill-progress, .viz-item, .process-step').forEach(el => {
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            });
        }

        setupCounters() {
            const animateCounter = (element, target, duration = 2000) => {
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = this.formatNumber(target);
                        clearInterval(timer);
                    } else {
                        element.textContent = this.formatNumber(Math.floor(current));
                    }
                }, 16);
            };

            const countersObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            // Hero stats
                            document.querySelectorAll('.stat-number').forEach(stat => {
                                const target = parseInt(stat.getAttribute('data-count'));
                                animateCounter(stat, target);
                            });

                            // Project stats
                            document.querySelectorAll('.stat-value').forEach(stat => {
                                if (stat.textContent.includes('₽')) {
                                    const value = stat.textContent.replace(/[^\d]/g, '');
                                    animateCounter(stat, parseInt(value), 2500);
                                }
                            });
                        }, 500);
                        countersObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            const statsSection = document.querySelector('.hero-stats');
            if (statsSection) {
                countersObserver.observe(statsSection);
            }
        }

        formatNumber(num) {
            if (num > 1000) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
            return num.toString();
        }

        setupParticles() {
            if (typeof particlesJS !== 'undefined') {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 80, density: { enable: true, value_area: 800 } },
                        color: { value: "#ffffff" },
                        shape: { type: "circle" },
                        opacity: { value: 0.5, random: true },
                        size: { value: 3, random: true },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#ffffff",
                            opacity: 0.4,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: true, mode: "repulse" },
                            onclick: { enable: true, mode: "push" },
                            resize: true
                        }
                    },
                    retina_detect: true
                });
            }
        }

        setupEnhancedModal() {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const modalCaption = document.querySelector('.modal-caption');
            const closeBtn = document.querySelector('.modal-close');

            document.querySelectorAll('.zoom-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const imgSrc = btn.getAttribute('data-image');
                    const caption = btn.getAttribute('data-caption') || btn.closest('.viz-item').querySelector('p').textContent;

                    modalImg.src = imgSrc;
                    modalImg.alt = caption;
                    modalCaption.textContent = caption;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Добавляем защиту для модального изображения
                    modalImg.classList.add('protected-image');
                });
            });

            // Закрытие модального окна
            [closeBtn, modal].forEach(element => {
                element.addEventListener('click', (e) => {
                    if (e.target === closeBtn || e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                        modalImg.src = '';
                        modalImg.alt = '';
                    }
                });
            });

            // Закрытие по Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        setupImageProtection() {
            // Улучшенная защита изображений
            document.querySelectorAll('.portfolio-image').forEach(img => {
                img.addEventListener('load', function() {
                    // Добавляем водяной знак поверх изображения
                    this.style.position = 'relative';
                });
            });
        }

        setupContactForm() {
            const contactForm = document.getElementById('contactForm');
            const fileInput = document.getElementById('file');
            const fileName = document.querySelector('.file-name');

            if (fileInput) {
                fileInput.addEventListener('change', (e) => {
                    if (e.target.files.length > 0) {
                        fileName.textContent = e.target.files[0].name;
                    } else {
                        fileName.textContent = '';
                    }
                });
            }

            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();

                    // Validate form
                    if (this.validateForm(contactForm)) {
                        // Get form data
                        const formData = new FormData(contactForm);
                        const data = Object.fromEntries(formData);

                        // Simulate form submission
                        this.showNotification('Запрос отправлен! Я свяжусь с вами в ближайшее время.', 'success');
                        contactForm.reset();
                        fileName.textContent = '';

                        // Here you would typically send data to a server
                        console.log('Form submitted:', data);
                    }
                });

                // Real-time validation
                contactForm.querySelectorAll('input, textarea').forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });
                });
            }
        }

        validateForm(form) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!this.validateField(field)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        validateField(field) {
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.validation-error');

            // Reset validation state
            formGroup.classList.remove('error');
            errorElement.textContent = '';

            // Check required fields
            if (field.hasAttribute('required') && !field.value.trim()) {
                formGroup.classList.add('error');
                errorElement.textContent = 'Это поле обязательно для заполнения';
                return false;
            }

            // Check email format
            if (field.type === 'email' && field.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    formGroup.classList.add('error');
                    errorElement.textContent = 'Введите корректный email адрес';
                    return false;
                }
            }

            return true;
        }

        showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';

            notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-left: 4px solid ${bgColor}99;
            max-width: 400px;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            `;
            notification.textContent = message;
            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Remove after delay
            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        }

        setupFloatingActions() {
            const fabButton = document.querySelector('.fab-button');
            const fabOptions = document.querySelector('.fab-options');

            if (fabButton && fabOptions) {
                fabButton.addEventListener('click', () => {
                    fabOptions.classList.toggle('active');
                });

                // Close FAB options when clicking outside
                document.addEventListener('click', (e) => {
                    if (!fabButton.contains(e.target) && !fabOptions.contains(e.target)) {
                        fabOptions.classList.remove('active');
                    }
                });
            }
        }

        setupBackToTop() {
            const backToTop = document.querySelector('.back-to-top');

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
        }

        setupProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            document.body.appendChild(progressBar);

            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }

        setupTypewriter() {
            const texts = [
                "Очистка данных",
                "Аналитическая визуализация",
                "Автоматизация отчетов",
                "Финансовый анализ",
                "Превращение хаоса в порядок"
            ];

            const typewriterElement = document.querySelector('.typewriter-text');
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;

            const typeWriter = () => {
                const currentText = texts[textIndex];

                if (isDeleting) {
                    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }

                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingSpeed = 1500;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typingSpeed = 500;
                }

                setTimeout(typeWriter, typingSpeed);
            };

            setTimeout(typeWriter, 2000);
        }

        setupMap() {
            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            // Simple map initialization - you would need to add your API key for full functionality
            try {
                const map = L.map('map').setView([55.7558, 37.6173], 10); // Moscow coordinates

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);

                L.marker([55.7558, 37.6173]).addTo(map)
                .bindPopup('Работаю удаленно')
                .openPopup();
            } catch (error) {
                console.log('Map initialization failed:', error);
                // Fallback - show message
                mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--light); color: var(--gray);">Карта недоступна</div>';
            }
        }

        setupParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.parallax');

                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    element.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }

        updateCopyright() {
            const copyrightElement = document.querySelector('.copyright');
            if (copyrightElement) {
                copyrightElement.textContent = `© ${new Date().getFullYear()} Радия Торшхоева. Все права защищены.`;
            }
        }

        cleanupTestimonials() {
            // Временно скрываем раздел с отзывами
            const testimonialsSection = document.getElementById('testimonials');
            if (testimonialsSection) {
                testimonialsSection.style.display = 'none';
            }
        }

        setupEnhancedFeatures() {
            // Дополнительные улучшения
            this.setupSmoothScrolling();
            this.setupLazyLoading();
            this.setupEnhancedTooltips();
        }

        setupSmoothScrolling() {
            // Плавная прокрутка для всех внутренних ссылок
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        setupLazyLoading() {
            // Ленивая загрузка изображений
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }

        setupEnhancedTooltips() {
            // Улучшенные подсказки для всех элементов с title
            document.querySelectorAll('[title]').forEach(element => {
                element.addEventListener('mouseenter', (e) => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'enhanced-tooltip';
                    tooltip.textContent = element.getAttribute('title');
                    document.body.appendChild(tooltip);

                    const rect = element.getBoundingClientRect();
                    tooltip.style.left = rect.left + (rect.width / 2) + 'px';
                    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

                    element.addEventListener('mouseleave', () => {
                        if (document.body.contains(tooltip)) {
                            document.body.removeChild(tooltip);
                        }
                    }, { once: true });
                });
            });
        }

        setupConsoleGreeting() {
            console.log(
                `%c🔒 УЛУЧШЕННОЕ ЗАЩИЩЕННОЕ ПОРТФОЛИО РАДИЯ ТОРШХОЕВА\n%c💼 Дата-ассистент | Специалист по анализу данных\n%c📊 Превращаю хаос данных в четкие инсайты\n\n⚡ Защита: Улучшенная система безопасности\n🎯 Навыки: Очистка, анализ, визуализация данных\n🚀 Готова к проектам: t.radiya7@gmail.com\n📱 Telegram: @tonettes7`,
                'color: #667eea; font-size: 18px; font-weight: bold;',
                'color: #764ba2; font-size: 14px; font-weight: 600;',
                'color: #333; font-size: 12px;'
            );
        }
    }

    // Initialize the application when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        new PortfolioApp();
    });

    // Add CSS for animations and enhanced features
    const style = document.createElement('style');
    style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .blurred {
        filter: blur(5px);
    }

    .parallax {
        transition: transform 0.1s ease;
    }

    @keyframes smoothAppear {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .enhanced-tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 10000;
        pointer-events: none;
        transform: translateX(-50%);
        white-space: nowrap;
        animation: tooltipFadeIn 0.2s ease;
    }

    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .lazy-loaded {
        opacity: 1;
    }
    `;
    document.head.appendChild(style);
})();
