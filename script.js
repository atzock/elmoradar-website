        // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-white');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-white');
        }
    });
});

// Live Checker
    const clientId = 'by1hsoqycfhct1fei90z2146fy3ctd';
    const accessToken = 'YOUR_TWITCH_ACCESS_TOKEN'; // Bitti nicht doxxi... pls
    const userLogin = 'elmoradar';

    async function checkIfLive() {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${userLogin}`, {
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        const isLive = data.data && data.data.length > 0;

        const liveStatusDiv = document.getElementById('liveStatus');

        if (isLive) {
            liveStatusDiv.classList.remove('hidden');
        } else {
            liveStatusDiv.classList.add('hidden');
        }
    }

    checkIfLive();
