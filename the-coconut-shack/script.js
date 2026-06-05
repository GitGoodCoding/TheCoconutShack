lucide.createIcons();


const menuSection = document.querySelector('.menu');
const cards = document.querySelectorAll('.drink-card');
const vibeSection = document.querySelector('.vibe');

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // show section
            menuSection.classList.add('show');

            // stagger cards
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 150);
            });

        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2
});

observer1.observe(menuSection);


const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2
});

observer2.observe(vibeSection);

/* INSTAGRAM CAROUSEL FUNCTIONALITY */

let currentInstagramPost = 1;
let instagramAutoPlayInterval;

function showInstagramPost(postNumber) {
    // Hide all posts
    document.querySelectorAll('.ig-post').forEach(post => {
        post.classList.remove('active');
    });

    // Hide all dots
    document.querySelectorAll('.ig-dot').forEach(dot => {
        dot.classList.remove('active');
    });

    // Show current post
    const postElement = document.getElementById(`ig-post-${postNumber}`);
    const dotElement = document.querySelectorAll('.ig-dot')[postNumber - 1];

    if (postElement) {
        postElement.classList.add('active');
    }

    if (dotElement) {
        dotElement.classList.add('active');
    }

    currentInstagramPost = postNumber;

    // Restart auto-play timer
    clearInterval(instagramAutoPlayInterval);
    startInstagramAutoPlay();
}

function goToInstagramPost(postNumber) {
    showInstagramPost(postNumber);
}

function instagramCarousel(direction) {
    let nextPost = currentInstagramPost;

    if (direction === 'next') {
        nextPost = currentInstagramPost === 3 ? 1 : currentInstagramPost + 1;
    } else if (direction === 'prev') {
        nextPost = currentInstagramPost === 1 ? 3 : currentInstagramPost - 1;
    }

    showInstagramPost(nextPost);
}

function startInstagramAutoPlay() {
    instagramAutoPlayInterval = setInterval(() => {
        instagramCarousel('next');
    }, 6000); // Change post every 6 seconds
}

// Initialize Instagram carousel when page loads
window.addEventListener('DOMContentLoaded', () => {
    showInstagramPost(1);
    startInstagramAutoPlay();
});

// Mobile navigation toggle
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
        });
    });
}



