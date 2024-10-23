const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height - 70,
    width: 50,
    height: 30,
    speed: 5,
    health: 100,
};

let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;
let keys = {};

// Create enemy function remains the same
function createEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: -50,
        width: 50,
        height: 30,
        speed: 2 + Math.random() * 2,
    };
    enemies.push(enemy);
}

setInterval(createEnemy, 1000); // Create a new enemy every second

document.addEventListener('keydown', (event) => {
    keys[event.key] = true; // Track pressed keys
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false; // Track released keys
});

function update() {
    // Player movement based on pressed keys
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < canvas.height - player.height) player.y += player.speed;
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;
    if (keys[' ']) bullets.push({ x: player.x + player.width / 2, y: player.y, speed: 10 });

    // Move bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) bullets.splice(index, 1); // Remove bullet if it goes off screen
    });

    // Move enemies
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        // Collision detection
        if (
            enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.y + enemy.height > player.y
        ) {
            player.health -= 20;
            enemies.splice(index, 1); // Remove enemy on collision
            if (player.health <= 0) gameOver = true;
        }
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
            score += 10; // Increase score for surviving
        }
    });

    // Bullet collision with enemies
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 10 > enemy.y
            ) {
                bullets.splice(bulletIndex, 1); // Remove bullet
                enemies.splice(enemyIndex, 1); // Remove enemy
                score += 20; // Increase score for hitting enemy
            }
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw player as a fighter jet (simplified)
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(player.x, player.y); // Nose
    ctx.lineTo(player.x + player.width / 2, player.y + player.height); // Wing
    ctx.lineTo(player.x - player.width / 2, player.y + player.height); // Wing
    ctx.closePath();
    ctx.fill();

    // Draw bullets
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });

    // Draw enemies
    ctx.fillStyle = 'green';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Draw score and health
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Health: ${player.health}`, 10, 40);

    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press F5 to restart', canvas.width / 2 - 100, canvas.height / 2 + 30);
    }
}

function gameLoop() {
    if (!gameOver) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
