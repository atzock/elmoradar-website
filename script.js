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

// Aktuelle YouTube Video
  const apiKey = 'YOUR_API_KEY'; // replace with your actual API key
  const channelId = 'YOUR_CHANNEL_ID'; // replace with the actual channel ID
  const maxResults = 2; // number of videos to show

  async function loadLatestVideos() {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`);
    const data = await res.json();

    const video1 = document.getElementById('video1');
    data.items.forEach(item => {
      if (item.id.kind === 'youtube#video') {
        const videoId = item.id.videoId;
        const videoEl = document.createElement('div');
        videoEl.className = 'bg-gray-900/50 rounded-xl p-8 border border-gray-700';
        videoEl.innerHTML = `
          <div class="w-full h-[300px]">
            <iframe class="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
        `;
        videoGrid.appendChild(videoEl);
      }
    });
  }

  loadLatestVideos();