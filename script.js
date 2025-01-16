function toggleMenu() {
    const menu = document.querySelector('.menulinks');
    const icon = document.querySelector('.hamicon');
    menu.classList.toggle('active');
    icon.classList.toggle('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.style.transition = 'background-image 1s ease-in-out';
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: '50px' 
    });

    const elements = document.querySelectorAll('section, .project-card, .about-container');
    elements.forEach(el => {
        el.classList.add('scroll-animate');
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('show');
        } else {
            observer.observe(el);
        }
    });
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.05) + 'px';
    });
}
function createSnowflake() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.animationDuration = Math.random() * 8 + 6 + 's';
    snow.style.opacity = Math.random() * 0.6 + 0.4;
    
    document.body.appendChild(snow);
    
    snow.addEventListener('animationend', () => {
        snow.remove();
    });
}

let snowInterval;

function startSnow() {
    if (!snowInterval) {
        snowInterval = setInterval(createSnowflake, 500);
    }
}

function stopSnow() {
    if (snowInterval) {
        clearInterval(snowInterval);
        snowInterval = null;
    }
}

document.addEventListener('click', (e) => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.menulinks');
    const icon = document.querySelector('.hamicon');
    
    if (!hamburger.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
        icon.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled || localStorage.getItem('darkMode') === null) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }
    initScrollAnimations();
    initParallax();
    startSnow();
});

