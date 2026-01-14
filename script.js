// IMB Training Courses - Interactive Features
// Smooth scrolling, hover effects, and accessibility enhancements

(function() {
    'use strict';

    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        // Add smooth scrolling to all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') {
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add animation on scroll for course cards
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all course cards
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Enhanced keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(function(element) {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid var(--imb-orange)';
                this.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });

        // Add loading state for external links
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Add visual feedback
                const originalText = this.textContent;
                this.textContent = 'Opening...';
                this.style.opacity = '0.7';
                
                // Reset after a short delay (in case link doesn't navigate immediately)
                setTimeout(function() {
                    link.textContent = originalText;
                    link.style.opacity = '1';
                }, 1000);
            });
        });
    });

    // Add hover effect enhancement for course cards
    document.addEventListener('DOMContentLoaded', function() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s ease';
            });
        });
    });

})();
