// Smooth scrolling for explore button
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.explore-btn');
    const directorySection = document.querySelector('.directory');

    exploreBtn.addEventListener('click', function() {
        directorySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all category contents
            categoryContents.forEach(content => content.classList.remove('active'));
            // Show corresponding content
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');

            // Clear search when switching tabs
            searchInput.value = '';
            filterBusinesses('');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterBusinesses(query);
    });

    function filterBusinesses(query) {
        const activeCategory = document.querySelector('.category-content.active');
        const businessCards = activeCategory.querySelectorAll('.business-card');

        businessCards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const description = card.getAttribute('data-description').toLowerCase();

            if (name.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Modal functionality
    const modal = document.getElementById('businessModal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalAddress = document.getElementById('modal-address');
    const modalPhone = document.getElementById('modal-phone');
    const modalWebsite = document.getElementById('modal-website');
    const closeBtn = document.querySelector('.close');

    // Add click event to business cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.business-card')) {
            const card = e.target.closest('.business-card');
            modalTitle.textContent = card.getAttribute('data-name');
            modalImage.src = card.getAttribute('data-image');
            modalDescription.textContent = card.getAttribute('data-description');
            modalAddress.textContent = card.getAttribute('data-address');
            modalPhone.textContent = card.getAttribute('data-phone');
            modalWebsite.href = card.getAttribute('data-website');

            modal.style.display = 'block';
        }
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact button scroll to contact section
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for enhanced animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and gallery items
    const featureCards = document.querySelectorAll('.feature-card');
    const galleryItems = document.querySelectorAll('.gallery-item');

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;

        hero.style.transform = `translateY(${rate}px)`;
    });

    // Add floating animation to title
    const title = document.querySelector('.title');
    let floatUp = true;
    let floatValue = 0;

    function floatAnimation() {
        if (floatUp) {
            floatValue += 0.5;
            if (floatValue >= 10) floatUp = false;
        } else {
            floatValue -= 0.5;
            if (floatValue <= -10) floatUp = true;
        }

        title.style.transform = `translateY(${floatValue}px)`;
        requestAnimationFrame(floatAnimation);
    }

    floatAnimation();

    // Add wave sound effect simulation (visual feedback)
    exploreBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });

    exploreBtn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
