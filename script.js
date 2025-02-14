// Smoke Heart Animation (Original)
function initSmokeHeart() {
  const canvas = document.getElementById('heart');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  let particles = [];
  let traceCount = 60;
  let size1 = 210;
  let size2 = 13;
  let size11 = 150;
  let size12 = 9;
  let pointsOrigin = [];
  let dr = 0.1;

  // Generate heart points
  for (let i = 0; i < Math.PI * 2; i += dr) {
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), size1, size2, 0, 0));
  }
  for (let i = 0; i < Math.PI * 2; i += dr) {
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), size11, size12, 0, 0));
  }
  for (let i = 0; i < Math.PI * 2; i += dr) {
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
  }

  // Initialize particles
  for (let i = 0; i < pointsOrigin.length; i++) {
    particles.push({
      vx: 0,
      vy: 0,
      R: 2,
      speed: Math.random() + 5,
      q: ~~(Math.random() * pointsOrigin.length),
      D: 2 * (i % 2) - 1,
      force: 0.2 * Math.random() + 0.7,
      f: `hsla(0, ${~~(40 * Math.random() + 60)}%, ${~~(60 * Math.random() + 20)}%, .3)`,
      trace: Array.from({ length: traceCount }, () => ({ x: Math.random() * width, y: Math.random() * height }))
    });
  }

  // Animation loop
  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(particle => {
      const q = pointsOrigin[particle.q];
      const dx = particle.trace[0].x - q[0] - width / 2;
      const dy = particle.trace[0].y - q[1] - height / 2;
      const length = Math.sqrt(dx * dx + dy * dy);

      if (length < 10) {
        if (Math.random() > 0.95) {
          particle.q = ~~(Math.random() * pointsOrigin.length);
        } else {
          if (Math.random() > 0.99) particle.D *= -1;
          particle.q += particle.D;
          particle.q %= pointsOrigin.length;
          if (particle.q < 0) particle.q += pointsOrigin.length;
        }
      }

      particle.vx += (-dx / length) * particle.speed;
      particle.vy += (-dy / length) * particle.speed;
      particle.trace[0].x += particle.vx;
      particle.trace[0].y += particle.vy;
      particle.vx *= particle.force;
      particle.vy *= particle.force;

      for (let k = 1; k < particle.trace.length; k++) {
        particle.trace[k].x -= 0.4 * (particle.trace[k].x - particle.trace[k - 1].x);
        particle.trace[k].y -= 0.4 * (particle.trace[k].y - particle.trace[k - 1].y);
      }

      ctx.fillStyle = particle.f;
      particle.trace.forEach(t => ctx.fillRect(t.x, t.y, 1, 1));
    });

    requestAnimationFrame(loop);
  }

  // Helper functions
  function heartPosition(rad) {
    return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
  }

  function scaleAndTranslate(pos, sx, sy, dx, dy) {
    return [dx + pos[0] * sx, dy + pos[1] * sy];
  }

  // Start animation
  loop();
}

// Button Functionality (Redirect to Yes/No Pages)
function setupButtons() {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');

  yesBtn.addEventListener('click', () => {
    window.location.href = 'yes-page.html'; // Redirect to Yes page
  });

  noBtn.addEventListener('click', () => {
    window.location.href = 'no-page.html'; // Redirect to No page
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initSmokeHeart(); // Original smoke heart animation
  setupButtons();   // Button functionality
});