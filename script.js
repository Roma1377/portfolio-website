// script.js - Protected Portfolio with Working Security
(function(){
    'use strict';

    // Enhanced Security System (Non-blocking)
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
            // Basic context menu protection for images only
            document.addEventListener('contextmenu', (e) => {
                if (e.target.tagName === 'IMG' && e.target.classList.contains('protected-image')) {
                    e.preventDefault();
                    this.showProtectionWarning('Защита: Контекстное меню для изображений отключено');
                    return false;
                }
            });

            // Basic drag protection for images only
            document.addEventListener('dragstart', (e) => {
                if (e.target.tagName === 'IMG' && e.target.classList.contains('protected-image')) {
                    e.preventDefault();
                    this.showProtectionWarning('Защита: Перетаскивание изображений ограничено');
                    return false;
                }
            });

            // Basic copy protection for protected content
            document.addEventListener('copy', (e) => {
                if (e.target.classList.contains('protected-content')) {
                    e.preventDefault();
                    this.showProtectionWarning('Защита: Копирование этого раздела ограничено');
                    return false;
                }
            });
        }

        setupBasicProtection() {
            // Basic keyboard protection - non-blocking
            document.addEventListener('keydown', (e) => {
                // Only block PrintScreen for protected content view
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
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 18px;
            border-radius: 8px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
            border-left: 4px solid #5a6fd8;
            max-width: 300px;
            font-weight: 500;
            font-size: 0.85rem;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            `;
            warning.innerHTML = `<i class="fas fa-shield-alt" style="margin-right: 8px;"></i>${message}`;
            document.body.appendChild(warning);

            // Animate in
            setTimeout(() => {
                warning.style.transform = 'translateX(0)';
            }, 100);

            // Remove after delay
            setTimeout(() => {
                warning.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(warning)) {
                        document.body.removeChild(warning);
                    }
                }, 300);
            }, 3000);
        }
    }

    // Main Portfolio Application
    class PortfolioApp {
        constructor() {
            this.security = new SecuritySystem();
            this.currentTestimonial = 0;
            this.isInitialized = false;
            this.map = null;
            this.mapInitialized = false;
            this.sliderInterval = null;
            this.init();
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

            this.isInitialized = true;
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

            // Fallback
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

                        // Update map size when scrolling to contact section
                        if (targetId === '#contact' && this.map && !this.mapInitialized) {
                            setTimeout(() => {
                                this.initializeMap();
                            }, 500);
                        }
                    }
                });
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

                        // Initialize map when contact section becomes visible
                        if (entry.target.id === 'contact' && !this.mapInitialized) {
                            setTimeout(() => {
                                this.initializeMap();
                            }, 300);
                        }
                    }
                });
            }, observerOptions);

            // Observe all animated elements
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
                        number: { value: 60, density: { enable: true, value_area: 800 } },
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
                });
            });

            // Close modal
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

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
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

                    if (this.validateForm(contactForm)) {
                        const formData = new FormData(contactForm);
                        const data = Object.fromEntries(formData);

                        this.showNotification('Запрос отправлен! Я свяжусь с вами в ближайшее время.', 'success');
                        contactForm.reset();
                        if (fileName) fileName.textContent = '';

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
            const bgColor = type === 'success' ? '#4CAF50' : '#2196F3';

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
            notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'info'}-circle" style="margin-right: 8px;"></i>${message}`;
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
            const fabButton = document.getElementById('fabMain');
            const fabOptions = document.querySelector('.fab-options');

            if (fabButton && fabOptions) {
                // Toggle FAB options
                fabButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fabOptions.classList.toggle('active');
                });

                // Close FAB when clicking outside
                document.addEventListener('click', (e) => {
                    if (!fabButton.contains(e.target) && !fabOptions.contains(e.target)) {
                        fabOptions.classList.remove('active');
                    }
                });

                // Close FAB after clicking an option
                fabOptions.addEventListener('click', (e) => {
                    if (e.target.closest('.fab-option')) {
                        setTimeout(() => {
                            fabOptions.classList.remove('active');
                        }, 300);
                    }
                });
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

            // Create a simple placeholder for map
            mapElement.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: var(--light); color: var(--gray); border-radius: var(--border-radius); padding: 2rem; text-align: center;">
            <i class="fas fa-globe" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <h4 style="margin-bottom: 0.5rem; color: var(--dark);">Глобальная удаленная работа</h4>
            <p style="opacity: 0.8; margin-bottom: 1rem;">Работаю с клиентами по всему миру</p>
            <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
            <span style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">🌍 UTC+3</span>
            <span style="background: var(--secondary); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">💼 Удаленно</span>
            <span style="background: var(--success); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">🚀 Доступна</span>
            </div>
            <p style="margin-top: 1.5rem; font-size: 0.9rem; opacity: 0.7;">
            <i class="fas fa-map-marker-alt"></i>
            Основное время работы: Москва, Россия
            </p>
            </div>
            `;
        }

        initializeMap() {
            if (this.mapInitialized) return;

            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            try {
                // Remove placeholder content
                mapElement.innerHTML = '';

                // Initialize map with proper settings
                this.map = L.map('map', {
                    zoomControl: true,
                    scrollWheelZoom: false,
                    dragging: true,
                    tap: true
                }).setView([55.7558, 37.6173], 2);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 18,
                    minZoom: 1
                }).addTo(this.map);

                // Add main marker
                const mainMarker = L.marker([55.7558, 37.6173]).addTo(this.map);
                mainMarker.bindPopup(`
                <div style="text-align: center; padding: 0.5rem;">
                <strong>📍 Основная локация</strong><br>
                Москва, Россия<br>
                <small>Работаю удаленно по всему миру</small>
                </div>
                `).openPopup();

                // Add some additional markers to show global presence
                const locations = [
                    [40.7128, -74.0060, 'Нью-Йорк, США'],
                    [51.5074, -0.1278, 'Лондон, Великобритания'],
                    [48.8566, 2.3522, 'Париж, Франция'],
                    [35.6762, 139.6503, 'Токио, Япония'],
                    [52.5200, 13.4050, 'Берлин, Германия']
                ];

                locations.forEach(([lat, lng, city]) => {
                    L.marker([lat, lng])
                    .addTo(this.map)
                    .bindPopup(`<strong>${city}</strong><br>Удаленная работа доступна`);
                });

                // Fit map to show all markers with padding
                const bounds = L.latLngBounds([
                    [55.7558, 37.6173], // Moscow
                    [40.7128, -74.0060], // New York
                    [51.5074, -0.1278], // London
                    [35.6762, 139.6503] // Tokyo
                ]);
                this.map.fitBounds(bounds, { padding: [20, 20] });

                // Update map size after a short delay to ensure container is visible
                setTimeout(() => {
                    this.map.invalidateSize();
                }, 100);

                this.mapInitialized = true;

            } catch (error) {
                console.log('Map initialization failed:', error);
                // Fallback to placeholder
                mapElement.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: var(--light); color: var(--gray); border-radius: var(--border-radius); padding: 2rem; text-align: center;">
                <i class="fas fa-globe" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h4 style="margin-bottom: 0.5rem; color: var(--dark);">Глобальная удаленная работа</h4>
                <p style="opacity: 0.8;">Карта временно недоступна</p>
                <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
                <span style="background: var(--primary); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">🌍 UTC+3</span>
                <span style="background: var(--secondary); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">💼 Удаленно</span>
                <span style="background: var(--success); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.8rem;">🚀 Доступна</span>
                </div>
                </div>
                `;
            }
        }

        // В методе setupSlider() заменяем всю функцию на исправленную версию:
        setupSlider() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.slider-nav.prev');
            const nextBtn = document.querySelector('.slider-nav.next');
            const indicators = document.querySelectorAll('.indicator');
            const currentSlideElement = document.querySelector('.current-slide');
            const totalSlidesElement = document.querySelector('.total-slides');

            if (!slider || slides.length === 0) {
                console.log('Slider elements not found');
                return;
            }

            let currentSlide = 0;
            const totalSlides = slides.length;
            let isAnimating = false; // FIX: Защита от множественных кликов

            // FIX: Упрощенная инициализация
            const initializeSlider = () => {
                totalSlidesElement.textContent = totalSlides;
                updateSliderCounter(currentSlide + 1);
                updateSliderState();

                // Показываем первый слайд
                slides.forEach((slide, index) => {
                    slide.classList.remove('active');
                });
                slides[0].classList.add('active');
                if (indicators.length > 0) {
                    indicators[0].classList.add('active');
                }
            };

            const goToSlide = (index) => {
                if (isAnimating) return;
                isAnimating = true;

                // FIX: Упрощенное переключение без сложных анимаций
                slides[currentSlide].classList.remove('active');
                if (indicators.length > 0) {
                    indicators[currentSlide].classList.remove('active');
                }

                currentSlide = index;

                slides[currentSlide].classList.add('active');
                if (indicators.length > 0) {
                    indicators[currentSlide].classList.add('active');
                }

                updateSliderCounter(currentSlide + 1);
                updateSliderState();

                // FIX: Сбрасываем флаг анимации после задержки
                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            };

            const nextSlide = () => {
                const nextIndex = (currentSlide + 1) % totalSlides;
                goToSlide(nextIndex);
                resetAutoSlide();
            };

            const prevSlide = () => {
                const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(prevIndex);
                resetAutoSlide();
            };

            const updateSliderCounter = (index) => {
                if (currentSlideElement) {
                    currentSlideElement.textContent = index;
                }
            };

            const updateSliderState = () => {
                // FIX: Упрощенное обновление состояния кнопок
                if (prevBtn && nextBtn) {
                    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
                    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
                    prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
                    nextBtn.style.cursor = currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer';
                }
            };

            // FIX: Упрощенные обработчики событий
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

            // FIX: Индикаторы
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (index !== currentSlide) {
                        goToSlide(index);
                        resetAutoSlide();
                    }
                });
            });

            // FIX: Упрощенная автоматическая прокрутка
            this.startAutoSlide = () => {
                this.stopAutoSlide();
                this.sliderInterval = setInterval(() => {
                    if (currentSlide < totalSlides - 1) {
                        nextSlide();
                    } else {
                        goToSlide(0);
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

            // FIX: Инициализация
            initializeSlider();
            this.startAutoSlide();

            // FIX: Обработчики для паузы при наведении
            const sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => {
                    this.stopAutoSlide();
                });

                sliderContainer.addEventListener('mouseleave', () => {
                    this.startAutoSlide();
                });
            }
        }

        startAutoSlide() {
            this.stopAutoSlide(); // Clear any existing interval
            this.sliderInterval = setInterval(() => {
                const nextBtn = document.querySelector('.slider-nav.next');
                if (nextBtn && !nextBtn.disabled) {
                    const slides = document.querySelectorAll('.slide');
                    const indicators = document.querySelectorAll('.indicator');
                    const currentSlideElement = document.querySelector('.current-slide');

                    let currentSlide = 0;
                    slides.forEach((slide, index) => {
                        if (slide.classList.contains('active')) {
                            currentSlide = index;
                        }
                    });

                    const nextIndex = (currentSlide + 1) % slides.length;

                    // Remove active class from current slide and indicator
                    slides[currentSlide].classList.remove('active');
                    indicators[currentSlide].classList.remove('active');

                    // Add active class to new slide and indicator
                    slides[nextIndex].classList.add('active');
                    indicators[nextIndex].classList.add('active');

                    // Update counter
                    if (currentSlideElement) {
                        currentSlideElement.textContent = nextIndex + 1;
                    }

                    // Update button states
                    this.updateSliderButtons();
                }
            }, 5000);
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

        updateSliderButtons() {
            const prevBtn = document.querySelector('.slider-nav.prev');
            const nextBtn = document.querySelector('.slider-nav.next');
            const slides = document.querySelectorAll('.slide');

            let currentSlide = 0;
            slides.forEach((slide, index) => {
                if (slide.classList.contains('active')) {
                    currentSlide = index;
                }
            });

            if (prevBtn && nextBtn) {
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === slides.length - 1;
            }
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

    // Add CSS for animations
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
        transition: filter 0.3s ease;
    }

    /* Ensure map container has proper dimensions */
    #map {
    min-height: 350px;
    width: 100%;
    background: var(--light);
    border-radius: var(--border-radius);
    }

    .leaflet-container {
        background: var(--light) !important;
        border-radius: var(--border-radius);
    }

    /* Enhanced slider transitions */
    .slider {
        display: flex;
        transition: transform 0.5s ease-in-out;
    }

    .slide {
        transition: opacity 0.5s ease-in-out;
    }

    .slide:not(.active) {
        display: none;
    }

    .slide.active {
        display: block;
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    `;
    document.head.appendChild(style);
})();
