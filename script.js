document.addEventListener('DOMContentLoaded', () => {
    const scrollArea = document.querySelector('.content-scroll-area');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.floating-nav__link');

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                scrollArea.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Add a small delay for smooth scroll animation before updating hash
                setTimeout(() => {
                    history.pushState(null, null, `#${targetId}`);
                }, 500);
            }
        });
    });

    // Update active nav link on scroll
    scrollArea.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = scrollArea.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust the offset to trigger earlier based on viewport
            if (scrollPosition >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('floating-nav__link--active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('floating-nav__link--active');
            }
        });

        // Cinematic Profile Scroll Fade Effect
        const profileLayer = document.querySelector('.cinematic-profile-layer');
        if (profileLayer) {
            const maxScroll = 500;
            const scrollPercent = Math.min(scrollPosition / maxScroll, 1);
            
            // Output a variable --scroll-fade from 1.0 (top) to 0.15 (scrolled)
            const minFade = 0.15;
            const currentFade = 1 - (scrollPercent * (1 - minFade));
            
            requestAnimationFrame(() => {
                profileLayer.style.setProperty('--scroll-fade', currentFade);
            });
        }
    });
});
