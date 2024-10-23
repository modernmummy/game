const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    speed: 5,
    health: 100,
    stamina: 100,
    resources: { food: 0, wood: 0 }, // Resource tracker
};

let resources = [];
let enemies = [];
let keys = {};
let gameOver = false;

// Resource class
class Resource {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type; // 'food' or 'wood'
    }
}

// Enemy class
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 2;
    }

    moveTowardsPlayer(player) {
        if (this.x < player.x) this.x += this.speed;
        if (this.x > player.x) this.x -= this.speed;
        if (this.y < player.y) this.y += this.speed;
        if (this.y > player.y) this.y -= this.speed;
    }
}

// Create resources
function createResource() {
    const types = ['food', 'wood'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const resource = new Resource(Math.random() * canvas.width, Math.random() * canvas.height, randomType);
    resources.push(resource);
}

// Spawn enemies
function createEnemy() {
    const enemy = new Enemy(Math.random() * canvas.width, Math.random() * canvas.height);
    enemies.push(enemy);
}

// Control player movement
document.addEventListener('keydown', (event) => {
    k
