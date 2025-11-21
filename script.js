// script.js - Enhanced Mobile Version with Critical Fixes
(function(){
    'use strict';

    // Enhanced Security System (Mobile Optimized)
    class SecuritySystem {
        constructor() {
            this.attempts = 0;
            this.maxAttempts = 5;
            this.init();
        }

        init() {
            this.protectContent();
            this.setupBasicProtection();
        }

        protectContent() {
            // Enhanced mobile protection
            document.addEventListener('contextmenu', (e) => {
                if (e.target.tagName === 'IMG' && e.target.classList.contains('protected-image')) {
                    e.preventDefault();
                    this.showProtectionWarning('Защита: Контекстное меню для изображений отключено');
                    return false;
                }
            });

            document.addEventListener('dragstart', (e) => {
                if (e.target.tagName === 'IMG' && e.target.classList.contains('protected-image')) {
                    e.preventDefault();
                    this.showProtectionWarning('Защита: Перетаскивание изображений ограничено');
                    return false;
                }
            });

            document.addEventListener('copy', (e) => {
                if (e.target.classList.contains('protected-content')) {
                    e.preventDefault();
                    this.showProtectionWarning('Защита: Копирование этого раздела ограничено');
                    return false;
                }
            });
        }

        setupBasicProtection() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'PrintScreen') {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal) {
                        e.preventDefault();
                        this.showProtectionWarning('Защита: Создание скриншотов ограничено в режиме просмотра');
                        return false;
                    }
                }
            });
        }

        showProtectionWarning(message) {
            const warning = document.createElement('div');
            warning.style.cssText = `
            position: fixed;
            top: 20px;
            left: 5%;
            right: 5%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 16px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
            border-left: 4px solid #5a6fd8;
            font-weight: 500;
            font-size: 14px;
            text-align: center;
            transform: translateY(-100px);
            transition: transform 0.3s ease;
            `;
            warning.innerHTML = `<i class="fas fa-shield-alt" style="margin-right: 8px;"></i>${message}`;
            document.body.appendChild(warning);

            setTimeout(() => {
                warning.style.transform = 'translateY(0)';
            }, 100);

            setTimeout(() => {
                warning.style.transform = 'translateY(-100px)';
                setTimeout(() => {
                    if (document.body.contains(warning)) {
                        document.body.removeChild(warning);
                    }
                }, 300);
            }, 3000);
        }
    }

    // Enhanced Portfolio Application with Mobile Fixes
    class PortfolioApp {
        constructor() {
            this.security = new SecuritySystem();
            this.currentTestimonial = 0;
            this.isInitialized = false;
            this.map = null;
            this.mapInitialized = false;
            this.sliderInterval = null;
            this.isMobile = this.detectMobile();
            this.init();
        }

        detectMobile() {
            return window.innerWidth <= 768;
        }

        init() {
            if (this.isInitialized) return;

            this.setupPreloader();
            this.setupNavigation();
            this.setupThemeToggle();
            this.setupAnimations();
            this.setupCounters();
            this.setupParticles();
            this.setupModal();
            this.setupContactForm();
            this.setupFloatingActions();
            this.setupBackToTop();
            this.setupProgressBar();
            this.setupTypewriter();
            this.setupMap();
            this.setupSlider();
            this.updateCopyright();
            this.setupConsoleGreeting();
            this.setupMobileEnhancements();

            this.isInitialized = true;
        }

        setupMobileEnhancements() {
            // Enhanced touch interactions
            if (this.isMobile) {
                this.setupTouchOptimizations();
                this.setupMobileNavigation();
            }

            // Handle resize events
            window.addEventListener('resize', () => {
                this.isMobile = this.detectMobile();
                if (this.map) {
                    setTimeout(() => {
                        this.map.invalidateSize();
                    }, 100);
                }
            });
        }

        setupTouchOptimizations() {
            // Improved touch targets
            document.querySelectorAll('.btn, .nav-link, .slider-nav, .indicator').forEach(el => {
                el.style.minHeight = '44px';
                el.style.minWidth = '44px';
            });

            // Prevent zoom on double tap
            let lastTouchEnd = 0;
            document.addEventListener('touchend', (e) => {
                const now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, false);
        }

        setupMobileNavigation() {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('touchstart', (e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                });

                link.addEventListener('touchend', (e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                });
            });

            // Close menu when clicking outside on mobile
            document.addEventListener('touchstart', (e) => {
                const nav = document.querySelector('.floating-nav');
                const navToggle = document.querySelector('.nav-toggle');
                const navLinks = document.querySelector('.nav-links');

                if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }

        setupPreloader() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const preloader = document.querySelector('.preloader');
                    if (preloader) {
                        preloader.classList.add('loaded');
                    }
                }, 1000);
            });

            setTimeout(() => {
                const preloader = document.querySelector('.preloader');
                if (preloader && !preloader.classList.contains('loaded')) {
                    preloader.classList.add('loaded');
                }
            }, 3000);
        }

        setupNavigation() {
            const nav = document.querySelector('.floating-nav');
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');

            if (!nav) return;

            // Enhanced sticky navigation
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            // Enhanced mobile menu toggle
            if (navToggle) {
                navToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navToggle.classList.toggle('active');
                    navLinks.classList.toggle('active');

                    // Close FAB when mobile menu is open
                    const fabOptions = document.querySelector('.fab-options');
                    if (fabOptions && fabOptions.classList.contains('active')) {
                        fabOptions.classList.remove('active');
                    }
                });
            }

            // Enhanced mobile menu close
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.isMobile && navToggle.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                });
            });

            // Enhanced smooth scroll
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

                        // Close mobile menu after click
                        if (this.isMobile && navToggle.classList.contains('active')) {
                            navToggle.classList.remove('active');
                            navLinks.classList.remove('active');
                        }
                    }
                });
            });

            // Enhanced outside click for mobile
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }

        setupThemeToggle() {
            const themeToggle = document.getElementById('themeToggle');
            if (!themeToggle) return;

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
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');

                        if (entry.target.classList.contains('skill-progress')) {
                            const level = entry.target.getAttribute('data-level');
                            setTimeout(() => {
                                entry.target.style.width = level + '%';
                            }, 300);
                        }

                        if (entry.target.id === 'contact' && !this.mapInitialized) {
                            setTimeout(() => {
                                this.initializeMap();
                            }, 300);
                        }
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.section, .service-card, .skill-progress, .viz-item, .process-step').forEach(el => {
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
                            document.querySelectorAll('.stat-number').forEach(stat => {
                                const target = parseInt(stat.getAttribute('data-count'));
                                animateCounter(stat, target);
                            });

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
                        number: { value: this.isMobile ? 20 : 30, density: { enable: true, value_area: 800 } },
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

        setupModal() {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const modalCaption = document.querySelector('.modal-caption');
            const closeBtn = document.querySelector('.modal-close');

            if (!modal) return;

            // Enhanced modal for mobile
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

                    // Enhanced mobile menu close
                    const navToggle = document.querySelector('.nav-toggle');
                    const navLinks = document.querySelector('.nav-links');
                    if (navToggle && navToggle.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    }

                    // Close FAB
                    const fabOptions = document.querySelector('.fab-options');
                    if (fabOptions && fabOptions.classList.contains('active')) {
                        fabOptions.classList.remove('active');
                    }
                });
            });

            // Enhanced modal close
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

            // Enhanced Escape close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // Enhanced touch close for mobile
            if (this.isMobile) {
                modal.addEventListener('touchstart', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
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

                    if (this.validateForm(contactForm)) {
                        const formData = new FormData(contactForm);
                        const data = Object.fromEntries(formData);

                        this.showNotification('Запрос отправлен! Я свяжусь с вами в ближайшее время.', 'success');
                        contactForm.reset();
                        if (fileName) fileName.textContent = '';

                        console.log('Form submitted:', data);
                    }
                });

                // Enhanced validation for mobile
                contactForm.querySelectorAll('input, textarea').forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });

                    input.addEventListener('input', () => {
                        const formGroup = input.closest('.form-group');
                        if (formGroup.classList.contains('error') && input.value.trim()) {
                            formGroup.classList.remove('error');
                            formGroup.querySelector('.validation-error').textContent = '';
                        }
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

            formGroup.classList.remove('error');
            errorElement.textContent = '';

            if (field.hasAttribute('required') && !field.value.trim()) {
                formGroup.classList.add('error');
                errorElement.textContent = 'Это поле обязательно для заполнения';
                return false;
            }

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
            const bgColor = type === 'success' ? '#4CAF50' : '#2196F3';

            notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 5%;
            right: 5%;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-left: 4px solid ${bgColor}99;
            text-align: center;
            transform: translateY(-100px);
            transition: transform 0.3s ease;
            `;
            notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle" style="margin-right: 8px;"></i>${message}`;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = 'translateY(0)';
            }, 100);

            setTimeout(() => {
                notification.style.transform = 'translateY(-100px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        }

        setupFloatingActions() {
            const fabButton = document.getElementById('fabMain');
            const fabOptions = document.querySelector('.fab-options');

            if (fabButton && fabOptions) {
                // Enhanced FAB for mobile
                fabButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fabOptions.classList.toggle('active');

                    // Close mobile menu if open
                    const navToggle = document.querySelector('.nav-toggle');
                    const navLinks = document.querySelector('.nav-links');
                    if (navToggle && navToggle.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                });

                // Enhanced outside click
                document.addEventListener('click', (e) => {
                    if (!fabButton.contains(e.target) && !fabOptions.contains(e.target)) {
                        fabOptions.classList.remove('active');
                    }
                });

                // Enhanced option click
                fabOptions.addEventListener('click', (e) => {
                    if (e.target.closest('.fab-option')) {
                        setTimeout(() => {
                            fabOptions.classList.remove('active');
                        }, 300);
                    }
                });

                // Убраны надписи для FAB - остались только иконки
                if (this.isMobile) {
                    fabOptions.classList.add('mobile-icons-only');
                }
            }
        }

        setupBackToTop() {
            const backToTop = document.querySelector('.back-to-top');

            if (!backToTop) return;

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
                "Финансовый анализ",
                "Превращение хаоса в порядок"
            ];

            const typewriterElement = document.querySelector('.typewriter-text');
            if (!typewriterElement) return;

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

            // Убрана глобальная работа, оставлена только Москва
            mapElement.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: var(--light); color: var(--gray); border-radius: var(--border-radius); padding: 2rem; text-align: center;">
            <i class="fas fa-map-marker-alt" style="font-size: ${this.isMobile ? '2rem' : '3rem'}; margin-bottom: 1rem; opacity: 0.5;"></i>
            <h4 style="margin-bottom: 0.5rem; color: var(--dark); font-size: ${this.isMobile ? '1.1rem' : '1.3rem'};">Москва, Россия</h4>
            <p style="opacity: 0.8; margin-bottom: 1rem; font-size: ${this.isMobile ? '0.9rem' : '1rem'};">Основная локация работы</p>
            <div style="display: flex; gap: 0.8rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
            <span style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">🌍 UTC+3</span>
            <span style="background: var(--success); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">🚀 Доступна</span>
            </div>
            </div>
            `;
        }

        initializeMap() {
            if (this.mapInitialized) return;
            this.mapInitialized = true;
        }

        setupSlider() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.slider-nav.prev');
            const nextBtn = document.querySelector('.slider-nav.next');
            const indicators = document.querySelectorAll('.indicator');
            const currentSlideElement = document.querySelector('.current-slide');
            const totalSlidesElement = document.querySelector('.total-slides');

            if (!slider || slides.length === 0) return;

            let currentSlide = 0;
            const totalSlides = slides.length;
            let isAnimating = false;
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            const initializeSlider = () => {
                totalSlidesElement.textContent = totalSlides;
                updateSliderCounter(currentSlide + 1);
                updateSliderState();

                slides.forEach((slide, index) => {
                    slide.classList.remove('active');
                    slide.style.transform = 'translateX(100%)';
                    slide.style.opacity = '0';
                });

                slides[0].classList.add('active');
                slides[0].style.transform = 'translateX(0)';
                slides[0].style.opacity = '1';

                if (indicators.length > 0) {
                    indicators[0].classList.add('active');
                }
            };

            const goToSlide = (index, direction = 'next') => {
                if (isAnimating) return;
                isAnimating = true;

                const currentActive = slides[currentSlide];
                const nextActive = slides[index];

                // Убираем текущий слайд
                currentActive.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
                currentActive.style.opacity = '0';

                // Показываем следующий слайд
                nextActive.style.transform = 'translateX(0)';
                nextActive.style.opacity = '1';

                // Обновляем классы
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    nextActive.classList.add('active');

                    if (indicators.length > 0) {
                        indicators[currentSlide].classList.remove('active');
                        indicators[index].classList.add('active');
                    }

                    currentSlide = index;
                    updateSliderCounter(currentSlide + 1);
                    updateSliderState();
                    isAnimating = false;
                }, 500);
            };

            const nextSlide = () => {
                const nextIndex = (currentSlide + 1) % totalSlides;
                goToSlide(nextIndex, 'next');
                this.resetAutoSlide();
            };

            const prevSlide = () => {
                const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(prevIndex, 'prev');
                this.resetAutoSlide();
            };

            const updateSliderCounter = (index) => {
                if (currentSlideElement) {
                    currentSlideElement.textContent = index;
                }
            };

            const updateSliderState = () => {
                if (prevBtn && nextBtn) {
                    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
                    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
                    prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
                    nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer';
                }
            };

            // Enhanced event listeners
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (currentSlide < totalSlides - 1) {
                        nextSlide();
                    }
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (currentSlide > 0) {
                        prevSlide();
                    }
                });
            }

            // Enhanced indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (index !== currentSlide) {
                        const direction = index > currentSlide ? 'next' : 'prev';
                        goToSlide(index, direction);
                        this.resetAutoSlide();
                    }
                });
            });

            // Enhanced touch support with smooth dragging
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                currentX = startX;
                isDragging = true;
                this.stopAutoSlide();
            });

            slider.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
                const diff = currentX - startX;

                // Плавное перемещение слайда при драге
                if (Math.abs(diff) > 10) {
                    const currentActive = slides[currentSlide];
                    const translateX = diff * 0.5;
                    currentActive.style.transform = `translateX(${translateX}px)`;
                }
            });

            slider.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;

                const diff = currentX - startX;
                const swipeThreshold = 50;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0 && currentSlide > 0) {
                        // Swipe right - previous
                        prevSlide();
                    } else if (diff < 0 && currentSlide < totalSlides - 1) {
                        // Swipe left - next
                        nextSlide();
                    } else {
                        // Return to current position
                        resetSlidePosition();
                    }
                } else {
                    resetSlidePosition();
                }

                setTimeout(() => {
                    this.startAutoSlide();
                }, 3000);
            });

            const resetSlidePosition = () => {
                const currentActive = slides[currentSlide];
                currentActive.style.transform = 'translateX(0)';
            };

            // Enhanced auto slide
            this.startAutoSlide = () => {
                this.stopAutoSlide();
                this.sliderInterval = setInterval(() => {
                    if (currentSlide < totalSlides - 1) {
                        nextSlide();
                    } else {
                        goToSlide(0, 'next');
                    }
                }, 5000);
            };

            this.stopAutoSlide = () => {
                if (this.sliderInterval) {
                    clearInterval(this.sliderInterval);
                    this.sliderInterval = null;
                }
            };

            this.resetAutoSlide = () => {
                this.stopAutoSlide();
                this.startAutoSlide();
            };

            // Initialize
            initializeSlider();
            this.startAutoSlide();

            // Enhanced pause on hover/touch
            const sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => {
                    this.stopAutoSlide();
                });

                sliderContainer.addEventListener('mouseleave', () => {
                    this.startAutoSlide();
                });

                sliderContainer.addEventListener('touchstart', () => {
                    this.stopAutoSlide();
                });

                sliderContainer.addEventListener('touchend', () => {
                    setTimeout(() => {
                        this.startAutoSlide();
                    }, 3000);
                });
            }
        }

        startAutoSlide() {
            this.stopAutoSlide();
        }

        stopAutoSlide() {
            if (this.sliderInterval) {
                clearInterval(this.sliderInterval);
                this.sliderInterval = null;
            }
        }

        resetAutoSlide() {
            this.stopAutoSlide();
            this.startAutoSlide();
        }

        updateCopyright() {
            const copyrightElement = document.querySelector('.copyright');
            if (copyrightElement) {
                const currentYear = new Date().getFullYear();
                copyrightElement.textContent = `© ${currentYear} Дата-специалист. Все права защищены.`;
            }
        }

        setupConsoleGreeting() {
            console.log(
                `%c🔒 ЗАЩИЩЕННОЕ ПОРТФОЛИО ДАТА-СПЕЦИАЛИСТА\n%c💼 Дата-ассистент | Специалист по анализу данных\n%c📊 Превращаю хаос данных в четкие инсайты\n\n⚡ Защита: Базовая система безопасности\n🎯 Навыки: Очистка, анализ, визуализация данных\n🚀 Готова к проектам: t.radiya7@gmail.com\n📱 Telegram: @tonettes7`,
                'color: #667eea; font-size: 16px; font-weight: bold;',
                'color: #764ba2; font-size: 12px; font-weight: 600;',
                'color: #333; font-size: 11px;'
            );
        }
    }

    // Initialize the application
    document.addEventListener('DOMContentLoaded', function() {
        new PortfolioApp();
    });

    // Add enhanced mobile CSS
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
    /* Enhanced Mobile Animations */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* Enhanced Mobile Navigation */
    @media (max-width: 768px) {
        .nav-links {
            display: none;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: var(--lighter);
            backdrop-filter: blur(20px);
            padding: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 1000;
            border-top: 1px solid var(--border);
        }

        .nav-link {
            display: flex !important;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            min-height: 48px;
        }

        .nav-text {
            display: inline-block !important;
            font-size: 14px;
            font-weight: 500;
            color: var(--dark);
        }

        .nav-link i {
            font-size: 16px;
            width: 20px;
            text-align: center;
        }

        .nav-toggle.active ~ .nav-links {
            display: flex !important;
        }
    }

    /* Enhanced Mobile Slider */
    @media (max-width: 768px) {
        .slider-container {
            margin: 1rem -10px;
        }

        .slider-wrapper {
            border-radius: 12px;
            overflow: hidden;
        }

        .slide {
            padding: 1rem;
        }

        .image-container {
            min-height: 200px;
            border-radius: 8px;
        }

        .portfolio-image {
            max-height: 200px;
            object-fit: contain;
        }

        .viz-item p {
            font-size: 14px;
            padding: 8px 12px;
            margin-top: 12px;
        }

        .slider-nav {
            width: 40px;
            height: 40px;
            font-size: 14px;
        }

        .slider-nav.prev {
            left: 8px;
        }

        .slider-nav.next {
            right: 8px;
        }

        .slider-indicators {
            gap: 6px;
            margin-top: 1rem;
        }

        .indicator {
            width: 10px;
            height: 10px;
        }

        .slider-counter {
            font-size: 12px;
        }
    }

    /* Enhanced Mobile Modal */
    @media (max-width: 768px) {
        .modal-content {
            max-width: 95%;
            max-height: 90%;
            padding: 1rem;
            margin: 1rem;
        }

        #modalImage {
        max-height: 60vh;
        }

        .modal-close {
            top: -35px;
            right: 0;
            width: 35px;
            height: 35px;
            font-size: 1.2rem;
        }
    }

    /* Enhanced Mobile FAB */
    @media (max-width: 768px) {
        .fab-options {
            bottom: 70px;
            right: 0;
        }

        .fab-option {
            width: auto;
            padding: 0 16px;
            border-radius: 25px;
            justify-content: flex-start;
            gap: 8px;
        }

        .fab-label {
            display: inline-block !important;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
        }
    }

    /* Enhanced Mobile Typography */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 2.2rem;
        }

        .section-header h2 {
            font-size: 1.8rem;
        }

        .section-header p {
            font-size: 1rem;
        }
    }

    /* Enhanced Touch Targets */
    @media (max-width: 768px) {
        .btn, .nav-link, .slider-nav, .indicator, .fab-option {
            min-height: 44px;
            min-width: 44px;
        }
    }
    `;
    document.head.appendChild(mobileStyles);
})();
