# elmoradar Website 🛩️

The official website for **elmoradar** - a Microsoft Flight Simulator and VATSIM streaming channel based in Berlin.

## 🎯 About

This is a modern, responsive website showcasing elmoradar's aviation content, featuring:
- Live flight tracking and streaming
- VATSIM professional ATC content
- Aviation community engagement
- Flight statistics and achievements

## ✨ Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS and custom animations
- **Live Status**: Real-time streaming indicators
- **Statistics Dashboard**: Flight hours, VATSIM flights, airports visited
- **Social Integration**: Links to Twitch, YouTube, and social media
- **German Language**: Tailored for German-speaking aviation community

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Custom animations and Tailwind CSS framework
- **JavaScript**: Interactive navigation and smooth scrolling
- **Fonts**: Inter font family from Google Fonts
- **Icons**: Custom aviation-themed iconography

## 📁 Project Structure

```
elmoradar-website/
├── index.html          # Main homepage
├── settings.html       # Settings/configuration page
├── impressum.html      # Legal information (German requirement)
├── script.js          # JavaScript functionality
├── README.md          # Project documentation
├── ToDo.md            # Development tasks
└── assets/            # Media files
    ├── logo.webp       # Main logo
    ├── *.webp          # Partner/sponsor logos
    ├── elmos/          # Profile images
    └── icons/          # UI icons
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/atzock/elmoradar-website.git
cd elmoradar-website
```

2. Open `index.html` in your web browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

## 🎨 Customization

### Colors
The website uses a red-orange aviation theme:
- Primary Red: `#dc2626`
- Dark Red: `#991b1b`
- Orange Accent: `#f97316`

### Fonts
- Primary: Inter (Google Fonts)
- Fallback: System sans-serif

### Statistics
Update the stats in `index.html` around line 125:
```html
<div class="text-3xl md:text-4xl font-bold text-red-400 stats-counter">1.8K</div>
<div class="text-gray-400 mt-2">Flugstunden</div>
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔗 External Links

- **Twitch**: [twitch.tv/elmoradar](https://twitch.tv/elmoradar)
- **YouTube**: [@elmoradarVODs](https://www.youtube.com/@elmoradarVODs)
- **VATSIM**: Professional ATC network integration

## 📄 Legal

- Includes German "Impressum" page for legal compliance
- User selection disabled for content protection
- Responsive design follows accessibility guidelines

## 🚧 Development

### To-Do Items
- [ ] Set up hosting solution
- [ ] Fix email icon display
- [ ] Additional feature implementations

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📞 Contact

For questions about the website or elmoradar content:
- **Stream**: [Twitch - elmoradar](https://twitch.tv/elmoradar)
- **Archive**: [YouTube - elmoradar VODs](https://www.youtube.com/@elmoradarVODs)

## 📊 Stats Overview

- **Flight Hours**: 1,800+
- **VATSIM Flights**: 450+
- **Airports Visited**: 75+
- **VATSIM Rating**: C1

---

*Built with ❤️ for the aviation community | © 2025 elmoradar*