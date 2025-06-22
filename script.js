
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numStars = 250;
const stars = [];

const starColors = [
    'rgba(255,255,255,ALPHA)',      // trắng
    'rgba(173,216,230,ALPHA)',      // xanh nhạt
    'rgba(255,182,193,ALPHA)',      // hồng nhạt
    'rgba(255,255,153,ALPHA)',      // vàng nhạt
    'rgba(200,200,255,ALPHA)',      // tím nhạt
    'rgba(144,238,144,ALPHA)'       // xanh lá nhạt
];

// Khởi tạo sao
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1) {
            star.alpha = 1;
            star.twinkleDir = -1;
        } else if (star.alpha <= 0.2) {
            star.alpha = 0.2;
            star.twinkleDir = 1;
        }

        ctx.beginPath();

        if (star.isMeteor) {
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x - 10, star.y - 5);
            ctx.strokeStyle = star.color.replace('ALPHA', star.alpha);
            ctx.lineWidth = 2;
            ctx.stroke();

            star.x += star.meteorSpeedX;
            star.y += star.meteorSpeedY;

            if (star.x > canvas.width || star.y > canvas.height) {
                star.x = Math.random() * canvas.width;
                star.y = 0;
            }
        } else {
            ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
            ctx.fillStyle = star.color.replace('ALPHA', star.alpha);
            ctx.fill();

            star.y += star.speed;
            if (star.y > canvas.height) {
                star.y = 0;
                star.x = Math.random() * canvas.width;
            }
        }
    }

    requestAnimationFrame(drawStars);
}

drawStars();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

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
    currentStarColor = isLight ? 'rgba(120, 120, 140, ALPHA)' : 'rgba(255, 255, 255, ALPHA)';
    localStorage.setItem("theme", isLight ? "light" : "dark");
});
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        toggleTheme.checked = true;
        currentStarColor = 'rgba(120, 120, 140, ALPHA)';
    }
});
const toggleBtn = document.querySelector('.menu-toggle');
const navList = document.querySelector('.right-header ul');

toggleBtn.addEventListener('click', () => {
  navList.classList.toggle('show');
});
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
