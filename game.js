const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 180,
  y: 550,
  width: 40,
  height: 40,
  speed: 5
};

let meteors = [];
let score = 0;
let gameOver = false;

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawMeteor(meteor) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
  ctx.fill();
}

function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: -20,
    radius: 15 + Math.random() * 10,
    speed: 2 + Math.random() * 3
  });
}

function updateMeteors() {
  for (let i = 0; i < meteors.length; i++) {
    meteors[i].y += meteors[i].speed;

    if (meteors[i].y > canvas.height) {
      meteors.splice(i, 1);
      score++;
      document.getElementById("score").textContent = score;
    }
  }
}

function detectCollision(meteor) {
  return (
    meteor.x > player.x &&
    meteor.x < player.x + player.width &&
    meteor.y + meteor.radius > player.y
  );
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();

  if (Math.random() < 0.02) {
    spawnMeteor();
  }

  updateMeteors();

  meteors.forEach(meteor => {
    drawMeteor(meteor);
    if (detectCollision(meteor)) {
      gameOver = true;
      alert("💥 Game Over! Pontuação: " + score);
      document.location.reload();
    }
  });

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) {
    player.x -= player.speed;
  }
  if (e.key === "ArrowRight" && player.x + player.width < canvas.width) {
    player.x += player.speed;
  }
});

update();