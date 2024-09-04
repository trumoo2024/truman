<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lacrosse Shootout</title>
    <style>
        body { text-align: center; font-family: Arial, sans-serif; }
        canvas { background-color: #87CEEB; margin-top: 20px; border: 1px solid #000; }
        #controls { margin-top: 20px; }
    </style>
</head>
<body>

    <h1>Lacrosse Shootout</h1>
    <p>Select Difficulty:</p>
    <select id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
    </select>
    <button onclick="startGame()">Start Game</button>

    <canvas id="gameCanvas" width="500" height="400"></canvas>

    <div id="controls">
        <button onclick="shoot('left')">Shoot Left</button>
        <button onclick="shoot('right')">Shoot Right</button>
        <button onclick="shoot('high')">Shoot High</button>
        <button onclick="shoot('low')">Shoot Low</button>
    </div>

    <p id="message"></p>
    <p id="score">Score: 0</p>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const directions = ['left', 'right', 'high', 'low'];
        let difficulty = 0.5;
        let shots = 5;
        let score = 0;

        const player = { x: 50, y: canvas.height - 100, width: 50, height: 100 };
        const ball = { x: 100, y: canvas.height - 125, radius: 10 };
        const goal = { x: canvas.width / 2 - 50, y: 50, width: 100, height: 200 };
        const goalie = { x: goal.x + goal.width / 2 - 25, y: goal.y + goal.height / 2 - 50, width: 50, height: 100 };

        function startGame() {
            const selectedDifficulty = document.getElementById('difficulty').value;
            if (selectedDifficulty === 'easy') {
                difficulty = 0.25;
            } else if (selectedDifficulty === 'medium') {
                difficulty = 0.5;
            } else if (selectedDifficulty === 'hard') {
                difficulty = 0.75;
            }
            shots = 5;
            score = 0;
            updateScore();
            document.getElementById('message').textContent = 'Game started! Take your shot!';
            drawField();
        }

        function drawField() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grass
            ctx.fillStyle = '#006400';
            ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

            // Draw goal
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

            // Draw goalie
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(goalie.x, goalie.y, goalie.width, goalie.height);

            // Draw player
            ctx.fillStyle = '#0000FF';
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // Draw ball
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.closePath();
        }

        function shoot(direction) {
            if (shots > 0) {
                shots--;
                const goalieDirection = directions[Math.floor(Math.random() * directions.length)];
                const block = Math.random() < difficulty && goalieDirection === direction;

                moveBall(direction);

                if (block) {
                    document.getElementById('message').textContent = `Goalie blocked your shot to the ${direction}!`;
                } else {
                    document.getElementById('message').textContent = `You scored by shooting ${direction}!`;
                    score++;
                }
                updateScore();
                if (shots === 0) {
                    document.getElementById('message').textContent += ` Game over! Final score: ${score}.`;
                }
                drawField();
            } else {
                document.getElementById('message').textContent = 'Game over! Click "Start Game" to play again.';
            }
        }

        function moveBall(direction) {
            const animationDuration = 500; // animation duration in ms
            const startX = ball.x;
            const startY = ball.y;
            let endX = startX;
            let endY = startY;

            if (direction === 'left') {
                endX = goal.x + ball.radius;
                endY = goal.y + goal.height / 2;
            } else if (direction === 'right') {
                endX = goal.x + goal.width - ball.radius;
                endY = goal.y + goal.height / 2;
            } else if (direction === 'high') {
                endX = goal.x + goal.width / 2;
                endY = goal.y + ball.radius;
            } else if (direction === 'low') {
                endX = goal.x + goal.width / 2;
                endY = goal.y + goal.height - ball.radius;
            }

            const startTime = performance.now();

            function animate() {
                const currentTime = performance.now();
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / animationDuration, 1);

                ball.x = startX + (endX - startX) * progress;
                ball.y = startY + (endY - startY) * progress;

                drawField();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            }

            requestAnimationFrame(animate);
        }

        function updateScore() {
            document.getElementById('score').textContent = `Score: ${score}`;
        }

        drawField();
    </script>

</body>
</html>

