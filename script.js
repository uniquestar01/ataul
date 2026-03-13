// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initGSAP();
    initCinematicIntro();
    initHearts();
    initMusicPlayer();
    initScrollProgress();
    initBalloons();
    initParallax();
    
    // Add event listeners to buttons
    document.getElementById('btn-surprise').addEventListener('click', () => {
        document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('start-catch-cake').addEventListener('click', startCatchCake);
    
    document.getElementById('btn-final').addEventListener('click', showFinalSurprise);

    // Share Buttons & Reaction
    const shareText = encodeURIComponent("🎉 Hey Ataul! I made this ultra-premium cinematic birthday surprise for you. Check it out: ");
    const currentUrl = encodeURIComponent(window.location.href);

    document.getElementById('whatsapp-share').addEventListener('click', () => {
        window.open(`https://api.whatsapp.com/send?text=${shareText}${currentUrl}`);
    });

    document.getElementById('ig-share').addEventListener('click', () => {
        // Fallback or generic intent for Instagram
        window.open(`https://www.instagram.com/`);
    });

    document.getElementById('reaction-btn').addEventListener('click', (e) => {
        gsap.to(e.currentTarget, { scale: 1.2, yoyo: true, repeat: 1, duration: 0.2 });
        confetti({
            particleCount: 20, spread: 50, origin: { x: 0.9, y: 0.9 }, shapes: ['heart'], colors: ['#ff1493', '#ff0000']
        });
    });
});

// 1. Particle Effects for Hero
function initParticles() {
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            color: { value: ["#9400d3", "#ff1493", "#00ffff", "#ffd700"] },
            links: { enable: false },
            move: {
                enable: true,
                speed: 1,
                direction: "top",
                random: true,
                straight: false,
                outModes: { default: "out" }
            },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
            },
            shape: { type: ["circle", "star"] },
            size: {
                value: { min: 1, max: 5 },
                animation: { enable: true, speed: 2, minimumValue: 0.1, sync: false }
            }
        },
        detectRetina: true
    });
}

// 2. GSAP Animations and ScrollTriggers
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    const blocks = document.querySelectorAll('.reveal-up');
    blocks.forEach(block => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    });
}

// 3. Cinematic Intro Sequence
function initCinematicIntro() {
    const cine1el = document.getElementById("cine-1");
    const cine2el = document.getElementById("cine-2");
    const cine3el = document.getElementById("cine-3");
    const cine4el = document.getElementById("cine-4");
    const scrollHint = document.getElementById("scroll-hint");

    const line1 = "Today is not just a normal day…";
    const line2 = "Today the world celebrates someone special.";
    
    // Typing helper
    function typeText(element, text, speed, callback) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if(callback) {
                callback();
            }
        }
        type();
    }

    // Timeline Setup
    setTimeout(() => {
        typeText(cine1el, line1, 70, () => {
            // Pause 2 seconds
            setTimeout(() => {
                typeText(cine2el, line2, 60, () => {
                    setTimeout(() => {
                        cine3el.classList.remove("hidden");
                        cine4el.classList.remove("hidden");
                        gsap.from(cine3el, { scale: 0.8, opacity: 0, duration: 1.5, ease: "power2.out" });
                        gsap.from(cine4el, { y: 30, opacity: 0, duration: 1, delay: 0.5 });
                        setTimeout(() => scrollHint.classList.remove("hidden"), 1000);
                    }, 500);
                });
            }, 2000);
        });
    }, 1000);
}

// 4. Floating Hearts in Message Card
function initHearts() {
    const container = document.getElementById('hearts-container');
    const colors = ['#ff758c', '#ff7eb3', '#ff1493', '#9400d3', '#ffd700'];
    
    setInterval(() => {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-30px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 2 + 0.8) + 'rem';
        heart.style.opacity = '0';
        heart.style.filter = 'drop-shadow(0 0 5px rgba(255,20,147,0.5))';
        heart.style.animation = `floatHeart ${Math.random() * 3 + 4}s ease-in forwards`;
        
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 7000);
    }, 600);
}

// 5. Music Player with Volume Control
function initMusicPlayer() {
    const music = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    const icon = btn.querySelector('i');
    const slider = document.getElementById('volume-slider');
    let isPlaying = false;

    music.volume = slider.value;

    slider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });

    btn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            icon.className = 'fas fa-play';
        } else {
            music.play().then(() => {
                icon.className = 'fas fa-pause';
            }).catch(e => {
                console.log("Audio play failed.", e);
            });
        }
        isPlaying = !isPlaying;
    });
}

// 6. Scroll Progress Bar
function initScrollProgress() {
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-bar").style.width = scrolled + "%";
    });
}

// 7. Lightbox functionality for Memories
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const content = lightbox.querySelector('.lightbox-content');
    
    const clone = element.querySelector('.polaroid-img').cloneNode(true);
    clone.style.width = '100%';
    clone.style.height = '100%';
    clone.style.borderRadius = '12px';
    clone.style.border = 'none';
    
    content.innerHTML = '';
    content.appendChild(clone);
    
    gsap.to(lightbox, { display: 'flex', opacity: 1, duration: 0.4, ease: "power2.out" });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    gsap.to(lightbox, { opacity: 0, duration: 0.3, onComplete: () => { lightbox.style.display = 'none'; } });
}

// 8. Advanced Game Logic

// a. Catch The Flying Cake
let cakeScore = 0;
let cakeInterval;
function startCatchCake() {
    const area = document.getElementById('catch-cake-area');
    const btn = document.getElementById('start-catch-cake');
    const msg = document.getElementById('cake-msg');
    const scoreText = document.getElementById('cake-score');
    
    btn.style.display = 'none';
    cakeScore = 0;
    scoreText.innerText = cakeScore;
    msg.innerText = "Catch normal (10), Golden (50)! Avoid Bombs (-20)!";
    msg.style.color = "var(--gold)";
    
    let time = 20; // 20 seconds game
    let speedMultiplier = 1;
    let spawnRate = 800; // ms
    
    function gameTick() {
        if(time <= 0) {
            clearTimeout(cakeInterval);
            msg.innerText = "Ataul Energy Level Unlocked 🎂🔥";
            msg.style.color = "var(--accent)";
            btn.style.display = 'inline-block';
            btn.innerText = "Play Again";
            return;
        }
        
        spawnEntity(area, speedMultiplier);
        
        // Increase difficulty
        speedMultiplier -= 0.03; // Fall faster
        time--;
        spawnRate = Math.max(300, spawnRate - 30); // Spawn faster
        
        cakeInterval = setTimeout(gameTick, spawnRate);
    }
    
    gameTick();
}

function spawnEntity(area, speedMultiplier) {
    const entity = document.createElement('div');
    
    // Determine type: 80% Normal, 10% Golden, 10% Bomb
    const rand = Math.random();
    let type = 'normal';
    if(rand > 0.90) type = 'golden';
    else if(rand > 0.80) type = 'bomb';
    
    entity.innerHTML = type === 'normal' ? '🎂' : (type === 'golden' ? '🌟' : '💣');
    entity.style.position = 'absolute';
    entity.style.left = Math.random() * (area.offsetWidth - 40) + 'px';
    entity.style.top = '-40px';
    entity.style.fontSize = type === 'golden' ? '40px' : '35px';
    entity.style.cursor = 'pointer';
    entity.style.userSelect = 'none';
    entity.style.filter = type === 'golden' ? 'drop-shadow(0 0 10px gold)' : 'none';
    
    area.appendChild(entity);
    
    const dur = (2.5 + Math.random()) * Math.max(0.4, speedMultiplier);
    
    gsap.to(entity, {
        y: area.offsetHeight + 40,
        duration: dur,
        ease: 'none',
        onComplete: () => {
            if(entity.parentNode === area) entity.remove();
        }
    });
    
    entity.addEventListener('mousedown', () => {
        if(type === 'normal') {
            cakeScore += 10;
            triggerMiniConfetti(entity, ['#ffffff', '#ff1493']);
            document.getElementById('cake-msg').innerText = "Ataul Energy Level: +10 🎂";
        } else if(type === 'golden') {
            cakeScore += 50;
            triggerMiniConfetti(entity, ['#ffd700', '#ffa500']);
            document.getElementById('cake-msg').innerText = "Legendary Energy Catch! +50 🎂🔥";
        } else if(type === 'bomb') {
            cakeScore -= 20;
            gsap.fromTo('#cake-score', {x:-5}, {x:5, yoyo:true, repeat:5, duration:0.05});
            entity.innerHTML = '💥';
            document.getElementById('cake-msg').innerText = "Energy Loss! -20 💣";
        }
        
        document.getElementById('cake-score').innerText = cakeScore;
        
        gsap.killTweensOf(entity);
        gsap.to(entity, {scale: 0, opacity: 0, duration: 0.2, onComplete: () => entity.remove()});
    });
    
    entity.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mousedown');
        entity.dispatchEvent(mouseEvent);
    });
}

function triggerMiniConfetti(el, colors) {
    const rect = el.getBoundingClientRect();
    confetti({
        particleCount: 20,
        spread: 40,
        origin: { 
            x: (rect.left / window.innerWidth), 
            y: (rect.top / window.innerHeight) 
        },
        colors: colors
    });
}

// b. Find Legendary Gift
const giftMessages = [
    "Legendary Friend Badge Unlocked",
    "Unlimited Happiness Found",
    "Friendship Level 100 Achieved"
];
let giftOpened = false;
function openGift(element, num) {
    if(giftOpened) return;
    
    gsap.to(element, { y: -30, rotation: Math.random() > 0.5 ? 15 : -15, duration: 0.2, yoyo: true, repeat: 3 });
    setTimeout(() => {
        element.innerHTML = '💎';
        element.style.filter = 'drop-shadow(0 0 20px #00ffff)';
        
        const msgEl = document.getElementById('gift-msg');
        msgEl.innerText = giftMessages[num - 1];
        msgEl.style.color = "var(--accent)";
        msgEl.style.fontWeight = "bold";
        
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.7 },
            colors: ['#00ffff', '#ff1493', '#ffd700', '#9400d3']
        });
        giftOpened = true;
    }, 800);
}

// c. Quiz
function checkQuiz(btn, isCorrect) {
    const btns = document.querySelectorAll('.premium-quiz-btn');
    btns.forEach(b => b.disabled = true);
    
    if(isCorrect) {
        btn.style.background = 'linear-gradient(45deg, #00b09b, #96c93d)';
        btn.style.borderColor = '#96c93d';
        btn.innerHTML += ' <i class="fas fa-check-circle" style="float:right"></i>';
        
        var duration = 4 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#9400d3', '#ff1493', '#00ffff', '#ffd700'] });
            confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#9400d3', '#ff1493', '#00ffff', '#ffd700'] });

            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    } else {
        btn.style.background = 'linear-gradient(45deg, #ff416c, #ff4b2b)';
        btn.style.borderColor = '#ff4b2b';
        btn.innerHTML += ' <i class="fas fa-times-circle" style="float:right"></i>';
        
        // Highlight correct one
        btns[2].style.background = 'linear-gradient(45deg, #00b09b, #96c93d)';
        btns[2].style.borderColor = '#96c93d';
    }
}

// 9. Ultra Realistic Cake Interaction
let candlesBlown = 0;
function blowCandle(element) {
    if(element.classList.contains('blown')) return;
    
    // Play sound if possible or visual logic
    const flame = element.querySelector('.flame');
    gsap.to(flame, { scale: 0, opacity: 0, duration: 0.1 });
    element.classList.add('blown');
    candlesBlown++;
    playBlowSound();
    
    // Create smoke effect
    const smoke = document.createElement('div');
    smoke.style.position = 'absolute';
    smoke.style.top = '-20px';
    smoke.style.left = '0px';
    smoke.style.width = '14px';
    smoke.style.height = '14px';
    smoke.style.borderRadius = '50%';
    smoke.style.background = 'rgba(200,200,200,0.6)';
    smoke.style.filter = 'blur(5px)';
    element.appendChild(smoke);
    
    gsap.to(smoke, {
        y: -100,
        x: Math.random() * 60 - 30,
        scale: 4,
        opacity: 0,
        duration: 2.5,
        ease: 'power1.out',
        onComplete: () => smoke.remove()
    });
    
    if(candlesBlown === 3) {
        setTimeout(() => {
            const msg = document.getElementById('wish-msg');
            msg.innerText = "Make a wish Ataul ✨";
            msg.classList.remove("hidden");
            gsap.from(msg, { scale: 0.5, opacity: 0, y: 30, duration: 1, ease: 'elastic.out(1, 0.5)' });
            
            // Celebration
            var duration = 3 * 1000;
            var end = Date.now() + duration;
            var defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 0 };
            
            function randomInRange(min, max) { return Math.random() * (max - min) + min; }
            
            var interval = setInterval(function() {
                var timeLeft = end - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);
                var particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
            
            playCelebrateSound();
        }, 1000);
    }
}

// 13. Synthesized Sound Effects
function playBlowSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'noise'; // Not a real type, using helper for noise
    
    // Simulate puff with white noise
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.connect(gain);
    gain.connect(ctx.destination);
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    
    noise.start();
    noise.stop(ctx.currentTime + 0.2);
}

function playCelebrateSound() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
}

// 10. Final Cinematic Surprise
function showFinalSurprise() {
    const pre = document.getElementById('pre-surprise');
    const post = document.getElementById('post-surprise');
    
    // Add realistic fireworks background
    tsParticles.load("final-particles", {
        fpsLimit: 60,
        particles: {
            color: { value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"] },
            move: {
                enable: true,
                speed: { min: 3, max: 8 },
                direction: "top",
                random: true,
                straight: false,
                outModes: { default: "destroy", top: "none" },
            },
            number: { density: { enable: true, area: 800 }, value: 0 },
            opacity: { value: 1 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 6 } },
            life: { duration: { sync: false, value: 3 }, count: 1 },
            emitter: {
                direction: "top",
                life: { count: 0, duration: 0.1, delay: 0.1 },
                rate: { delay: 0.1, quantity: 10 },
                size: { width: 100, height: 0 },
                position: { x: 50, y: 100 }
            }
        }
    });

    gsap.to(pre, { 
        opacity: 0, 
        scale: 0.8,
        duration: 0.6, 
        ease: 'power3.in',
        onComplete: () => {
            pre.classList.add('hidden');
            post.classList.remove('hidden');
            
            // Dramatic reveal
            gsap.from(post.children, {
                y: 60,
                opacity: 0,
                scale: 0.9,
                duration: 1.5,
                stagger: 0.4,
                ease: "power4.out"
            });

            // Realistic fireworks confetti layer
            var duration = 15 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 100 };

            function randomInRange(min, max) { return Math.random() * (max - min) + min; }

            var interval = setInterval(function() {
              var timeLeft = animationEnd - Date.now();
              if (timeLeft <= 0) return clearInterval(interval);

              var particleCount = 60 * (timeLeft / duration);
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
              confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
            playCelebrateSound();
        }
    });
}

// 11. Floating Balloons
function initBalloons() {
    const container = document.createElement('div');
    container.className = 'balloon-container';
    document.body.appendChild(container);
    
    const colors = [
        'rgba(148, 0, 211, 0.3)', 
        'rgba(255, 20, 147, 0.3)', 
        'rgba(0, 255, 255, 0.3)', 
        'rgba(255, 215, 0, 0.3)'
    ];

    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 90 + '%';
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.width = (40 + Math.random() * 40) + 'px';
        balloon.style.height = (balloon.offsetWidth * 1.25) + 'px';
        balloon.style.animation = `floatUp ${10 + Math.random() * 10}s linear forwards`;
        
        container.appendChild(balloon);
        setTimeout(() => balloon.remove(), 20000);
    }, 3000);
}

// 12. Subtle Parallax
function initParallax() {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        
        const parallaxEls = document.querySelectorAll('.parallax');
        parallaxEls.forEach(el => {
            const factor = el.dataset.parallax || 1;
            gsap.to(el, {
                x: x * factor,
                y: y * factor,
                duration: 0.5,
                ease: 'power1.out'
            });
        });
    });
}
