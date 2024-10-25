import pygame
import random

# Initialize Pygame
pygame.init()

# Constants
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
FPS = 60
LAVA_COLOR = (255, 0, 0)
PLATFORM_COLOR = (0, 255, 0)
CUBE_COLOR = (0, 0, 255)
PLAYER_COLOR = (255, 255, 0)

# Player settings
player_size = 50
player_x = 100
player_y = SCREEN_HEIGHT - player_size - 10
player_velocity = 5

# Cube settings
cube_size = 30
cubes = [(random.randint(0, SCREEN_WIDTH - cube_size), random.randint(0, SCREEN_HEIGHT - cube_size - 100)) for _ in range(5)]
cube_speed = 2

# Set up display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Lava Platformer")

# Game loop
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Player movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and player_x > 0:
        player_x -= player_velocity
    if keys[pygame.K_RIGHT] and player_x < SCREEN_WIDTH - player_size:
        player_x += player_velocity
    if keys[pygame.K_UP] and player_y > 0:
        player_y -= player_velocity
    if keys[pygame.K_DOWN] and player_y < SCREEN_HEIGHT - player_size:
        player_y += player_velocity

    # Move cubes
    for i in range(len(cubes)):
        cubes[i] = (cubes[i][0] + cube_speed, cubes[i][1])
        # Bounce back when hitting the wall
        if cubes[i][0] >= SCREEN_WIDTH - cube_size or cubes[i][0] <= 0:
            cube_speed = -cube_speed

    # Collision detection
    player_rect = pygame.Rect(player_x, player_y, player_size, player_size)
    for cube in cubes:
        cube_rect = pygame.Rect(cube[0], cube[1], cube_size, cube_size)
        if player_rect.colliderect(cube_rect):
            print("Game Over! You touched a blue cube.")
            running = False

    # Draw everything
    screen.fill(LAVA_COLOR)  # Fill background with lava color
    for cube in cubes:
        pygame.draw.rect(screen, CUBE_COLOR, (cube[0], cube[1], cube_size, cube_size))  # Draw cubes
    pygame.draw.rect(screen, PLAYER_COLOR, (player_x, player_y, player_size, player_size))  # Draw player

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()

