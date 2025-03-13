// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 500,
        easing: 'ease-in-out',
        once: true
    });
});

// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
});