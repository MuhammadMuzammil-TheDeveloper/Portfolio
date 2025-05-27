document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1500);
    });

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        this.classList.toggle('active');
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        html.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        
        if (html.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
            this.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.innerHTML = '<i class="fas fa-moon text-gray-700"></i>';
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
                mobileMenuButton.classList.remove('active');
            }
        });
    });

    // Sticky navbar with scroll behavior
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        // Show scroll to top button
        const scrollToTopBtn = document.getElementById('scrollToTop');
        if (scrollTop > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
        }
    });

    // Scroll to top button
    document.getElementById('scrollToTop').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Skill filter functionality
    const skillFilters = document.querySelectorAll('.skill-filter');
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active state
            skillFilters.forEach(f => {
                f.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
                f.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-700');
            });
            
            this.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-700');
            this.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
            
            // Filter skills
            const filterValue = this.getAttribute('data-filter');
            
            skillCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project filter functionality
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active state
            projectFilters.forEach(f => {
                f.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
                f.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-700');
            });
            
            this.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-700');
            this.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
            
            // Filter projects
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all-projects' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project modal functionality
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    const projectModals = document.querySelectorAll('[id$="-modal"]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modal.querySelector('.modal-container').classList.remove('scale-95', 'opacity-0');
                    modal.querySelector('.modal-container').classList.add('scale-100', 'opacity-100');
                }, 10);
            }
        });
    });
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('[id$="-modal"]');
            modal.querySelector('.modal-container').classList.remove('scale-100', 'opacity-100');
            modal.querySelector('.modal-container').classList.add('scale-95', 'opacity-0');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });
    
    // Close modal when clicking outside
    projectModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.querySelector('.modal-container').classList.remove('scale-100', 'opacity-100');
                this.querySelector('.modal-container').classList.add('scale-95', 'opacity-0');
                
                setTimeout(() => {
                    this.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });

    // Initialize 3D background
    init3DBackground();

    // Initialize animations on scroll
    initScrollAnimations();
});

// 3D Background with Three.js
function init3DBackground() {
    const canvas = document.getElementById('three-bg');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-aos');
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate__animated', `animate__${animation}`);
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    animateOnScroll();
}

// Form Validation
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.querySelectorAll('[id$="-error"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Validate form
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    if (!name.value.trim()) {
        document.getElementById('name-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!email.value.trim() || !isValidEmail(email.value)) {
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!subject.value.trim()) {
        document.getElementById('subject-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!message.value.trim()) {
        document.getElementById('message-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const submitSpinner = document.getElementById('submitSpinner');
        const formSuccess = document.getElementById('formSuccess');
        const formError = document.getElementById('formError');
        
        submitText.textContent = 'Sending...';
        submitSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Hide loading state
            submitText.textContent = 'Send Message';
            submitSpinner.classList.add('hidden');
            submitBtn.disabled = false;
            
            // Show success message
            formSuccess.classList.remove('hidden');
            formError.classList.add('hidden');
            
            // Reset form
            this.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }, 1500);
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}