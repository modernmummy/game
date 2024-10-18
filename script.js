let currentStage = 0;

const stages = [
    {
        text: "You find yourself in a spaceship. What will you do?",
        options: [
            { text: "Take off", nextStage: 1 },
            { text: "Check the controls", nextStage: 2 }
        ]
    },
    {
        text: "You take off and enter space. You see two planets. Which one will you explore?",
        options: [
            { text: "Planet Zarnok", nextStage: 3 },
            { text: "Planet Aelon", nextStage: 4 }
        ]
    },
    {
        text: "You check the controls and notice a warning about low fuel. You need to take off!",
        options: [
            { text: "Take off", nextStage: 1 }
        ]
    },
    {
        text: "You land on Zarnok. It's a desert planet. You find a hidden treasure!",
        options: [
            { text: "Return to spaceship", nextStage: 1 }
        ]
    },
    {
        text: "You land on Aelon. The planet is inhabited by hostile aliens!",
        options: [
            { text: "Fight", nextStage: 5 },
            { text: "Flee", nextStage: 1 }
        ]
    },
    {
        text: "You fought bravely but were overwhelmed. Game Over.",
        options: []
    }
];

function startGame() {
    currentStage = 0;
    showStage();
}

function showStage() {
    const stage = stages[currentStage];
    document.getElementById("story-text").innerText = stage.text;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';
    stage.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            currentStage = option.nextStage;
            showStage();
        };
        optionsDiv.appendChild(button);
    });
}
