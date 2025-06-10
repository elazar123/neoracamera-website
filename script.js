// Ultra Premium Website JavaScript

// Portfolio carousel variables
let portfolioCurrentSlide = 0;
let portfolioItemsPerSlide = 3; // Default for desktop

// Set responsive items per slide
function setPortfolioItemsPerSlide() {
    if (window.innerWidth <= 768) {
        portfolioItemsPerSlide = 2; // 1×2 on mobile
    } else if (window.innerWidth <= 1024) {
        portfolioItemsPerSlide = 4; // 2×2 on tablet
    } else {
        portfolioItemsPerSlide = 6; // 3×2 on desktop
    }
    console.log('Items per slide set to:', portfolioItemsPerSlide);
}

// Call on load and resize
setPortfolioItemsPerSlide();
window.addEventListener('resize', setPortfolioItemsPerSlide);

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initSmoothScrolling();
    initPortfolioFilter();
    initContactForm();
    initScrollAnimations();
    initHeaderEffects();
    initFloatingElements();
    initCounterAnimations();
    initAccessibility();
    initTestimonialSlider();
    initVideoThumbnails();
    
    // Portfolio carousel disabled - showing all videos in static grid
    
    // Global scroll to bottom (contact section) function
    window.scrollToServices = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Global scroll to portfolio function
    window.scrollToPortfolio = function() {
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Global scroll to contact function
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Smooth scrolling for navigation
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Add active state
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Portfolio filter functionality
    function initPortfolioFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item-premium');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter items with smooth animation
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Advanced contact form
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('.submit-btn-premium');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate submit button
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                const formData = new FormData(form);
                const name = formData.get('name');
                const phone = formData.get('phone');
                const business = formData.get('business');
                const packageType = formData.get('package') || 'לא צוין';
                const message = formData.get('message') || 'לא נכתב הודעה נוספת';
                
                // Create WhatsApp message
                const whatsappMessage = `שלום! אני מעוניין ביום צילום.
                
פרטים:
• שם: ${name}
• טלפון: ${phone}
• תחום העסק: ${business}
• חבילה מעוניין: ${packageType}
• הודעה: ${message}

תודה!`;
                
                const whatsappUrl = `https://wa.me/972505052951?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = '<span>הודעה נשלחה!</span> <i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>שלח בקשה</span> <i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 2000);
        });
        
        // Enhanced form validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField.call(this);
                }
            });
        });
        
        function validateField() {
            const value = this.value.trim();
            const isRequired = this.hasAttribute('required');
            let isValid = true;
            
            if (isRequired && !value) {
                isValid = false;
            }
            
            if (this.type === 'tel' && value && !isValidPhone(value)) {
                isValid = false;
            }
            
            if (isValid) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
                this.classList.add('error');
            }
        }
        
        function isValidPhone(phone) {
            return /^[\d\-\+\(\)\s]+$/.test(phone) && phone.length >= 9;
        }
    }
    
    // Scroll-based animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card-premium, .portfolio-item-premium, .package-ultra, .testimonial-card-premium');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Header scroll effects
    function initHeaderEffects() {
        const header = document.querySelector('.modern-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Floating elements animation
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element, .floating-badge');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.002 + (index * 0.001);
            const amplitude = 10 + (index * 5);
            
            function animate() {
                const time = Date.now() * speed;
                const y = Math.sin(time) * amplitude;
                const x = Math.cos(time * 0.5) * (amplitude * 0.5);
                
                element.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(animate);
            }
            
            animate();
        });
    }
    
    // Counter animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        function animateCounter(element) {
            const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const start = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);
                
                element.textContent = element.textContent.includes('%') ? `${current}%` : `${current}+`;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
    }
    
    // Accessibility features
    function initAccessibility() {
        const accessibilityBtn = document.getElementById('accessibilityBtn');
        let highContrast = false;
        let fontSize = 100;
        
        if (accessibilityBtn) {
            accessibilityBtn.addEventListener('click', function() {
                showAccessibilityMenu();
            });
        }
        
        function showAccessibilityMenu() {
            const menu = document.createElement('div');
            menu.className = 'accessibility-menu';
            menu.innerHTML = `
                <div class="accessibility-overlay">
                    <div class="accessibility-panel">
                        <h3>נגישות</h3>
                        <button id="toggleContrast">ניגודיות גבוהה</button>
                        <button id="increaseFontSize">הגדל טקסט</button>
                        <button id="decreaseFontSize">הקטן טקסט</button>
                        <button id="resetAccessibility">איפוס</button>
                        <button id="closeAccessibility">סגור</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(menu);
            
            // Add event listeners
            menu.querySelector('#toggleContrast').addEventListener('click', toggleHighContrast);
            menu.querySelector('#increaseFontSize').addEventListener('click', () => changeFontSize(10));
            menu.querySelector('#decreaseFontSize').addEventListener('click', () => changeFontSize(-10));
            menu.querySelector('#resetAccessibility').addEventListener('click', resetAccessibility);
            menu.querySelector('#closeAccessibility').addEventListener('click', () => menu.remove());
            menu.querySelector('.accessibility-overlay').addEventListener('click', (e) => {
                if (e.target === e.currentTarget) menu.remove();
            });
        }
        
        function toggleHighContrast() {
            highContrast = !highContrast;
            document.body.classList.toggle('high-contrast', highContrast);
        }
        
        function changeFontSize(change) {
            fontSize += change;
            fontSize = Math.max(80, Math.min(150, fontSize));
            document.documentElement.style.fontSize = `${fontSize}%`;
        }
        
        function resetAccessibility() {
            highContrast = false;
            fontSize = 100;
            document.body.classList.remove('high-contrast');
            document.documentElement.style.fontSize = '100%';
        }
    }

    // Testimonial Slider
    function initTestimonialSlider() {
        const slides = document.querySelectorAll('.testimonial-card-premium');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        
        // Show first slide
        showSlide(0);
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto-advance every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Arrow navigation
        window.changeTestimonial = function(direction) {
            if (direction === 1) {
                nextSlide();
            } else {
                prevSlide();
            }
        };
    }
    
    function initPortfolioCarousel() {
        console.log('Starting portfolio carousel initialization...');
        
        const grid = document.getElementById('portfolioGrid');
        const items = document.querySelectorAll('.portfolio-item-premium');
        const dotsContainer = document.getElementById('portfolioDots');
        
        console.log('Found elements:', {
            grid: !!grid,
            items: items.length,
            dotsContainer: !!dotsContainer
        });
        
        if (!grid || !items || items.length === 0) {
            console.log('Portfolio elements not found - cannot initialize');
            return;
        }
        
        const totalItems = items.length;
        
        // Update items per slide based on current screen size
        setPortfolioItemsPerSlide();
        const totalSlides = Math.ceil(totalItems / portfolioItemsPerSlide);
        
        console.log('Portfolio carousel initialized:', {
            totalItems: totalItems,
            itemsPerSlide: portfolioItemsPerSlide,
            totalSlides: totalSlides
        });
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'portfolio-dot';
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('onclick', `setPortfolioSlide(${i})`);
                dotsContainer.appendChild(dot);
            }
            console.log('Created', totalSlides, 'dots');
        }
        
        // Initial update
        updatePortfolioCarousel();
        
        // Debug: Log initial state
        console.log('Initial carousel state:', {
            currentSlide: portfolioCurrentSlide,
            totalItems: totalItems,
            totalSlides: totalSlides,
            itemsPerSlide: portfolioItemsPerSlide
        });
        
        // Add auto-advance with pause on hover
        let autoAdvanceInterval = setInterval(() => {
            console.log('Auto-advancing carousel...');
            window.movePortfolioCarousel(1);
        }, 8000);
        
        // Pause on hover
        grid.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });
        
        grid.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(() => {
                window.movePortfolioCarousel(1);
            }, 8000);
        });
        
        console.log('Portfolio carousel fully initialized');
    }
    
    function updatePortfolioCarousel() {
        const grid = document.getElementById('portfolioGrid');
        const dots = document.querySelectorAll('.portfolio-dot');
        
        if (!grid) return;
        
        // Calculate responsive items per slide
        setPortfolioItemsPerSlide();
        
        // For grid layout, we need to calculate based on grid width
        const itemWidth = 300;
        const gap = 32;
        const columnsPerSlide = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
        const gridWidth = itemWidth * columnsPerSlide + gap * (columnsPerSlide - 1);
        const translateX = -portfolioCurrentSlide * gridWidth;
        
        grid.style.transform = `translateX(${translateX}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === portfolioCurrentSlide);
        });
        
        console.log('Carousel moved to slide:', portfolioCurrentSlide, 'translateX:', translateX, 'itemsPerSlide:', portfolioItemsPerSlide, 'gridWidth:', gridWidth);
    }
    
    // Global functions
    window.movePortfolioCarousel = function(direction) {
        console.log('movePortfolioCarousel called with direction:', direction);
        
        // Make sure we have current responsive settings
        setPortfolioItemsPerSlide();
        
        const totalItems = document.querySelectorAll('.portfolio-item-premium').length;
        const totalSlides = Math.ceil(totalItems / portfolioItemsPerSlide);
        
        console.log('Current state:', {
            currentSlide: portfolioCurrentSlide,
            totalSlides: totalSlides,
            direction: direction,
            itemsPerSlide: portfolioItemsPerSlide
        });
        
        portfolioCurrentSlide += direction;
        
        if (portfolioCurrentSlide < 0) {
            portfolioCurrentSlide = totalSlides - 1;
        } else if (portfolioCurrentSlide >= totalSlides) {
            portfolioCurrentSlide = 0;
        }
        
        console.log('New slide:', portfolioCurrentSlide);
        updatePortfolioCarousel();
    };
    
    window.setPortfolioSlide = function(slideIndex) {
        console.log('setPortfolioSlide called with index:', slideIndex);
        
        // Make sure we have current responsive settings
        setPortfolioItemsPerSlide();
        
        const totalItems = document.querySelectorAll('.portfolio-item-premium').length;
        const totalSlides = Math.ceil(totalItems / portfolioItemsPerSlide);
        
        if (slideIndex >= 0 && slideIndex < totalSlides) {
            portfolioCurrentSlide = slideIndex;
            console.log('Setting slide to:', portfolioCurrentSlide);
            updatePortfolioCarousel();
        } else {
            console.log('Invalid slide index:', slideIndex, 'total slides:', totalSlides);
        }
    };
    
    // Add custom styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modern-header {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .modern-header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
            background-color: rgba(239, 68, 68, 0.05);
        }
        
        .form-group input.success,
        .form-group select.success,
        .form-group textarea.success {
            border-color: #10b981;
            background-color: rgba(16, 185, 129, 0.05);
        }
        
        .accessibility-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .accessibility-panel {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            text-align: center;
        }
        
        .accessibility-panel h3 {
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .accessibility-panel button {
            display: block;
            width: 100%;
            margin: 0.5rem 0;
            padding: 0.75rem;
            background: linear-gradient(135deg, #ff6b35 0%, #ff8f70 50%, #ffa891 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .accessibility-panel button:hover {
            transform: translateY(-2px);
        }
        
        .high-contrast {
            filter: contrast(150%) brightness(150%);
        }
    `;
    
    document.head.appendChild(style);
    
    // Video modal functionality - plays videos within the site
    function initVideoThumbnails() {
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const modalClose = document.querySelector('.video-modal-close');
        
        if (!videoModal || !videoFrame || !modalClose) {
            console.log('Video modal elements not found, skipping video initialization');
            return;
        }
        
        // Function to convert YouTube URL to embed URL
        function getYouTubeEmbedUrl(url) {
            const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
            const match = url.match(regex);
            if (match) {
                return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0&modestbranding=1`;
            }
            return url;
        }
        
        // Function to open video modal
        function openVideoModal(youtubeUrl) {
            const embedUrl = getYouTubeEmbedUrl(youtubeUrl);
            videoFrame.src = embedUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Function to close video modal
        function closeVideoModal() {
            videoModal.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = '';
        }
        
        const videoThumbnails = document.querySelectorAll('.video-thumbnail');
        
        videoThumbnails.forEach(thumbnail => {
            // Remove any existing onclick
            thumbnail.removeAttribute('onclick');
            
            thumbnail.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Video thumbnail clicked');
                
                // Get YouTube URL from data attribute
                const youtubeUrl = this.getAttribute('data-youtube-url');
                
                if (youtubeUrl) {
                    console.log('Opening video modal for:', youtubeUrl);
                    openVideoModal(youtubeUrl);
                }
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
            
            // Add hover effects
            thumbnail.addEventListener('mouseenter', function() {
                const playButton = this.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    playButton.style.backgroundColor = 'rgba(255, 107, 53, 1)';
                }
            });
            
            thumbnail.addEventListener('mouseleave', function() {
                const playButton = this.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                    playButton.style.backgroundColor = 'rgba(255, 107, 53, 0.9)';
                }
            });
        });
        
        // Close modal events
        modalClose.addEventListener('click', closeVideoModal);
        
        // Close modal when clicking outside
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // Close modal with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
        
        console.log('Video modal initialized for', videoThumbnails.length, 'thumbnails');
    }
});

// Performance optimization
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
}); 