// Set up canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Function to set canvas size and particles count based on screen size
function setCanvasSizeAndParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate particle count based on screen size
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let particleCount = screenWidth * screenHeight / 2000; // Adjust this factor as needed

    // Ensure particle count is within reasonable limits
    particleCount = Math.min(Math.max(particleCount, 100), 1000); // Adjust the range as needed

    // Clear existing particles and create new particles
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            vx: Math.random() * 0.5 - 0.25,
            vy: Math.random() * 0.5 - 0.25
        });
    }
}

// Initialize particles array
const particles = [];

// Initialize canvas size and particles on page load
setCanvasSizeAndParticles();

// Redraw particles when the window is resized
window.addEventListener('resize', setCanvasSizeAndParticles);

// Draw particles and connect them with lines
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';

    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect particles with lines
        particles.forEach(otherParticle => {
            if (particle !== otherParticle) {
                const dx = otherParticle.x - particle.x;
                const dy = otherParticle.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) { // Adjust the distance for the lines as needed
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                    ctx.stroke();
                }
            }
        });
    });
}

// Update particles
function updateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x > canvas.width) {
            particle.x = 0;
        } else if (particle.x < 0) {
            particle.x = canvas.width;
        }

        if (particle.y > canvas.height) {
            particle.y = 0;
        } else if (particle.y < 0) {
            particle.y = canvas.height;
        }
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    drawParticles();
    updateParticles();
}

animate();
