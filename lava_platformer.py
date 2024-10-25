import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Screen settings
SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Lava Platformer Game")

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
BLACK = (0, 0, 0)

# Game Variables
gravity = 0.5
player_speed = 5
player_jump = -10

# Platform settings
platform_width, platform_height = 100, 20
platform_list = [(200, 400), (400, 300), (600, 200)]

# Player settings
player_size = 40
player = pygame.Rect(100, SCREEN_HEIGHT - player_size - platform_height, player_size, player_size)
player_vel_y = 0
player_on_ground = False

# Obstacles
obstacle_list = []

for _ in range(5):
    x = random.randint(0, SCREEN_WIDTH - 20)
    y = random.randint(50, SCREEN_HEIGHT - 200)
    obstacle_list.append(pygame.Rect(x, y, 20, 20))

# Game Over function
def game_over():
    font = pygame.font.Font(None, 74)
    text = font.render("Game Over", True, RED)
    screen.blit(text, (SCREEN_WIDTH // 2 - text.get_width() // 2, SCREEN_HEIGHT // 2 - text.get_height() // 2))
    pygame.display.flip()
    pygame.time.delay(2000)
    pygame.quit()
    sys.exit()

# Game loop
clock = pygame.time.Clock()
running = True
while running:
    screen.fill(WHITE)

    # Event Handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Player movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        player.x -= player_speed
    if keys[pygame.K_RIGHT]:
        player.x += player_speed
    if keys[pygame.K_SPACE] and player_on_ground:
        player_vel_y = player_jump
        player_on_ground = False

    # Apply gravity
    player_vel_y += gravity
    player.y += player_vel_y

    # Check for floor collision
    if player.y + player_size > SCREEN_HEIGHT:
        game_over()

    # Platform collision detection
    player_on_ground = False
    for platform in platform_list:
        plat_rect = pygame.Rect(platform[0], platform[1], platform_width, platform_height)
        if player.colliderect(plat_rect) and player_vel_y >= 0:
            player.y = platform[1] - player_size
            player_vel_y = 0
            player_on_ground = True

    # Draw platforms
    for platform in platform_list:
        pygame.draw.rect(screen, BLACK, (platform[0], platform[1], platform_width, platform_height))

    # Draw player
    pygame.draw.rect(screen, RED, player)

    # Move and draw obstacles
    for obstacle in obstacle_list:
        obstacle.y += random.choice([-1, 1])  # Move randomly up or down
        if obstacle.y < 0 or obstacle.y > SCREEN_HEIGHT - 20:
            obstacle.y = random.randint(50, SCREEN_HEIGHT - 200)

        pygame.draw.rect(screen, BLUE, obstacle)

        # Check collision with obstacles
        if player.colliderect(obstacle):
            game_over()

    # Update screen
    pygame.display.flip()
    clock.tick(60)

pygame.quit()

