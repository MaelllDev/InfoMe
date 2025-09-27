// Digital Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const clockElement = document.getElementById('digital-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Create floating particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation duration
    const startX = Math.random() * window.innerWidth;
    const animationDuration = 4 + Math.random() * 4; // 4-8 seconds
    const drift = (Math.random() - 0.5) * 200; // Random horizontal drift
    
    particle.style.left = startX + 'px';
    particle.style.animationDuration = animationDuration + 's';
    particle.style.setProperty('--drift', drift + 'px');
    
    // Random opacity and size
    particle.style.opacity = 0.3 + Math.random() * 0.7;
    const size = 1 + Math.random() * 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    document.getElementById('particles-container').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, animationDuration * 1000);
}

// Entry screen functionality
function initializeEntryScreen() {
    const entryScreen = document.getElementById('entry-screen');
    const mainContent = document.getElementById('main-content');
    const enterBtn = document.getElementById('enter-btn');
    
    enterBtn.addEventListener('click', () => {
        // Add click effect
        enterBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            enterBtn.style.transform = 'scale(1.05)';
        }, 100);

        // Start background music
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = 0.3; // Define volume para 50%
        backgroundMusic.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });

        // Hide entry screen and show main content
        setTimeout(() => {
            entryScreen.style.opacity = '0';
            entryScreen.style.visibility = 'hidden';

            setTimeout(() => {
                mainContent.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                animateMainContent();
            }, 300);
        }, 500);
    });
}

// Animate main content elements
function animateMainContent() {
    const elements = document.querySelectorAll('.container > *');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
}

// Social cards hover effects
function initializeSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add random rotation to icon
            const icon = card.querySelector('.social-icon');
            const randomRotation = (Math.random() - 0.5) * 30;
            icon.style.transform = `scale(1.2) rotate(${360 + randomRotation}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.social-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add subtle mouse movement effects
function initializeMouseEffects() {
    const container = document.querySelector('.container');
    
    document.addEventListener('mousemove', (e) => {
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        const rotateX = deltaY * 5;
        const rotateY = deltaX * 5;
        
        container.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        if (container) {
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Enter key to skip entry screen
        if (e.key === 'Enter' && !document.getElementById('entry-screen').style.opacity) {
            document.getElementById('enter-btn').click();
        }
        
        // ESC key to return to entry screen (hidden feature)
        if (e.key === 'Escape') {
            const entryScreen = document.getElementById('entry-screen');
            const mainContent = document.getElementById('main-content');
            
            if (entryScreen.style.opacity === '0') {
                entryScreen.style.opacity = '1';
                entryScreen.style.visibility = 'visible';
                mainContent.classList.add('hidden');
                document.body.style.overflow = 'hidden';
            }
        }
    });
}

// Glitch effect for title (occasional)
function addGlitchEffect() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    // Random chance of glitch effect
    if (Math.random() < 0.1) {
        title.style.textShadow = `
            2px 0 #ff0000,
            -2px 0 #00ff00,
            0 0 20px rgba(157, 78, 221, 0.3)
        `;
        
        setTimeout(() => {
            title.style.textShadow = '0 0 20px rgba(157, 78, 221, 0.3)';
        }, 150);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start clock
    updateClock();
    setInterval(updateClock, 1000);
    
    // Start particle system
    setInterval(createParticle, 300);
    
    // Initialize components
    initializeEntryScreen();
    initializeSocialCards();
    initializeMouseEffects();
    initializeKeyboardShortcuts();
    
    // Add occasional glitch effect
    setInterval(addGlitchEffect, 5000);
    
    // Preload and optimize
    setTimeout(() => {
        document.body.style.transition = 'all 0.3s ease';
    }, 1000);
});

// Add some extra visual effects
window.addEventListener('load', () => {
    // Create additional visual elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { 
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-10px) translateX(var(--drift, 50px));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

// Observe all animatable elements
document.querySelectorAll('.social-card, .clock-container, .status-container').forEach(el => {
    observer.observe(el);
});