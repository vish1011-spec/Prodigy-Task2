let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', function() {
    if (!running) {
        startStopBtn.textContent = 'Stop';
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 100);
        running = true;
    } else {
        startStopBtn.textContent = 'Start';
        clearInterval(timerInterval);
        running = false;
    }
});

lapBtn.addEventListener('click', function() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
        lapCounter++;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 1;
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
