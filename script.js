// ⭐ Hiệu ứng sao rơi
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const numStars = 250;
const stars = [];

const starColors = [
    'rgba(255,255,255,ALPHA)',
    'rgba(173,216,230,ALPHA)',
    'rgba(255,182,193,ALPHA)',
    'rgba(255,255,153,ALPHA)',
    'rgba(200,200,255,ALPHA)',
    'rgba(144,238,144,ALPHA)'
];

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() < 0.5 ? -1 : 1,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        isMeteor: Math.random() < 0.02,
        meteorSpeedX: Math.random() * 3 + 2,
        meteorSpeedY: Math.random() * 1 + 1
    });
}

function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let star of stars) {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1) {
            star.alpha = 1;
            star.twinkleDir = -1;
        } else if (star.alpha <= 0.2) {
            star.alpha = 0.2;
            star.twinkleDir = 1;
        }

        starCtx.beginPath();

        if (star.isMeteor) {
            starCtx.moveTo(star.x, star.y);
            starCtx.lineTo(star.x - 10, star.y - 5);
            starCtx.strokeStyle = star.color.replace('ALPHA', star.alpha);
            starCtx.lineWidth = 2;
            starCtx.stroke();

            star.x += star.meteorSpeedX;
            star.y += star.meteorSpeedY;

            if (star.x > starCanvas.width || star.y > starCanvas.height) {
                star.x = Math.random() * starCanvas.width;
                star.y = 0;
            }
        } else {
            starCtx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            starCtx.fillStyle = star.color.replace('ALPHA', star.alpha);
            starCtx.fill();

            star.y += star.speed;
            if (star.y > starCanvas.height) {
                star.y = 0;
                star.x = Math.random() * starCanvas.width;
            }
        }
    }

    requestAnimationFrame(drawStars);
}
drawStars();

// 🌸 Cánh hoa rơi
const sakuraCanvas = document.getElementById("sakuraleef");
const sakuraCtx = sakuraCanvas.getContext("2d");
sakuraCanvas.width = window.innerWidth;
sakuraCanvas.height = window.innerHeight;

let petals = [];

function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    sakuraCanvas.width = window.innerWidth;
    sakuraCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createPetal() {
    return {
        x: Math.random() * sakuraCanvas.width,
        y: Math.random() * -sakuraCanvas.height,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        size: Math.random() * 0.4 + 0.2,
        angle: Math.random() * Math.PI * 2,
        rotateSpeed: (Math.random() - 0.5) * 0.02,
        color: "rgba(255,182,193,1)"
    };
}

for (let i = 0; i < 100; i++) {
    petals.push(createPetal());
}

function drawPetal(ctx, x, y, size, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(size, size);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5, -10, -10, -20, 0, -30);
    ctx.bezierCurveTo(10, -20, 5, -10, 0, 0);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.8;
    ctx.fill();

    ctx.restore();
}

function updatePetals() {
    petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.rotateSpeed;

        if (p.y > sakuraCanvas.height + 30 || p.x < -30 || p.x > sakuraCanvas.width + 30) {
            Object.assign(p, createPetal(), { y: 0 });
        }
    });
}

function drawPetals() {
    sakuraCtx.clearRect(0, 0, sakuraCanvas.width, sakuraCanvas.height);
    for (let p of petals) {
        drawPetal(sakuraCtx, p.x, p.y, p.size, p.angle, p.color);
    }
    updatePetals();
}

function animatePetals() {
    drawPetals();
    requestAnimationFrame(animatePetals);
}
animatePetals();

// 🔊 Nhạc nền và cài đặt
const music = document.getElementById("bg-music");
const toggleMusic = document.getElementById("toggle-music");
const toggleTheme = document.getElementById("toggle-theme");
const settingsBtn = document.getElementById("settings-btn");
const settingsPanel = document.getElementById("settings-panel");

let isPlaying = false;
music.volume = 0.01;

settingsBtn.addEventListener("click", () => {
    settingsPanel.style.display = settingsPanel.style.display === "block" ? "none" : "block";
});

toggleMusic.addEventListener("change", () => {
    if (toggleMusic.checked) {
        music.play();
        isPlaying = true;
    } else {
        music.pause();
        isPlaying = false;
    }
});

toggleTheme.addEventListener("change", () => {
    const isLight = toggleTheme.checked;

    document.body.classList.toggle("light-mode", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");

    // 👉 Bật/tắt hiệu ứng theo theme
    sakuraCanvas.style.display = isLight ? "block" : "none";
    starCanvas.style.display = isLight ? "none" : "block";
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";

    if (isLight) {
        document.body.classList.add("light-mode");
        toggleTheme.checked = true;
    }

    sakuraCanvas.style.display = isLight ? "block" : "none";
    starCanvas.style.display = isLight ? "none" : "block";
});

// ☰ Toggle menu
const toggleBtn = document.querySelector('.menu-toggle');
const navList = document.querySelector('.right-header ul');
toggleBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// 📧 Gửi mail từ form
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const emailTo = "ltd9605@gmail.com";
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = `Liên hệ từ ${firstName} ${lastName}`;
    const body =
        `Người gửi: ${userEmail}%0D%0A%0D%0A` +
        `Nội dung:%0D%0A${encodeURIComponent(message)}`;

    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;
});
