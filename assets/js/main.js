// Theme Toggle Engine
const themeToggle = document.querySelectorAll('#theme-toggle');
const body = document.body;

const updateThemeIcon = (isLight) => {
    themeToggle.forEach(toggle => {
        const icon = toggle.querySelector('i');
        if (isLight) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
};

const toggleTheme = () => {
    const isLight = body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
};

// Initialize Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    updateThemeIcon(true);
}

themeToggle.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
});

// Mobile Menu Engine
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const headerActions = document.querySelector('.header-actions');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        body.classList.toggle('menu-open', isActive);

        if (isActive) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Close menu on link click
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
}

// Intersection Observer for scroll reveal - Disabled as per request for static site
/*
const revealItems = document.querySelectorAll('[data-reveal]');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
revealItems.forEach(item => {
    revealObserver.observe(item);
});
*/

// Sticky Header Shrink
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
    } else {
        header.style.padding = '15px 0';
    }
});

// Inject Login/Signup into mobile menu if they aren't there
const injectMobileAuth = () => {
    if (navMenu && window.innerWidth <= 768) {
        const navUl = navMenu.querySelector('ul');
        if (navUl && !navUl.querySelector('.mobile-auth')) {
            const authLi = document.createElement('li');
            authLi.className = 'mobile-auth';
            authLi.style.marginTop = '20px';
            authLi.style.display = 'flex';
            authLi.style.gap = '10px';
            authLi.innerHTML = `
                <a href="login.html" class="btn btn-compact" style="color:#fff !important;">Login</a>
                <a href="signup.html" class="btn btn-primary btn-compact">Signup</a>
            `;
            navUl.appendChild(authLi);
        }
    }
};

window.addEventListener('resize', injectMobileAuth);
window.addEventListener('load', injectMobileAuth);

// Password Visibility Toggle Engine
const setupPasswordToggles = () => {
    const toggles = document.querySelectorAll('.password-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', setupPasswordToggles);
window.addEventListener('load', setupPasswordToggles); // Double check for dynamic content

// Back to Top Logic
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

