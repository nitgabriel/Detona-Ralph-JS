const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        livesLeft: document.querySelector('#lives'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        score: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        timerId: setInterval(randomPosition, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countDownTimerId);
        alert('GAME OVER! A sua pontuação final foi: ' + state.values.score);
        playSound('gameover');
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomPosition() {
    state.view.squares.forEach(square => {
        square.classList.remove('enemy');
    });

    let randomPosition = state.view.squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('enemy');

    state.values.hitPosition = randomPosition.id;
}

function addListenerHitbox() {
    state.view.squares.forEach(square => {
        square.addEventListener('click', () => {
            if (square.classList.contains('enemy')) {
                state.values.score++;
                state.view.score.textContent = state.values.score;
                square.classList.remove('enemy');
                playSound('hit');
            } else if (!square.classList.contains('enemy')){
                state.values.lives--;
                state.view.livesLeft.textContent = `x${state.values.lives}`;
                
                if(state.values.lives > 0) {
                    playSound('error');
                } else if(state.values.lives <= 0) {
                    playSound('gameover');
                    clearInterval(state.actions.timerId);
                    clearInterval(state.actions.countDownTimerId);
                    setTimeout(() => {alert('GAME OVER! A sua pontuação final foi: ' + state.values.score)}, 500)
                }
            }
        });
    });
}

function init() {
    addListenerHitbox();
}

init();