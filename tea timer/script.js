//constants about how much time each tea takes to infuse
const starting2Minutes = 2;
const starting3Minutes = 3;
const starting10Minutes = 10;

//constant types of tea
const teas = [
    { id: "herbal", time: starting10Minutes * 60 },
    { id: "white", time: starting3Minutes * 60 },
    { id: "green", time: starting2Minutes * 60 },
    { id: "yellow", time: starting2Minutes * 60 },
    { id: "oolong", time: starting2Minutes * 60 },
    { id: "black", time: starting3Minutes * 60 },
    { id: "dark", time: starting2Minutes * 60 }
];

const intervalIds = {};
let isTimerRunning = false;

const startBtn = document.getElementById("start-btn");
const refreshBtn = document.getElementById("refresh-btn");

//addEventListener of the buttons Start and Refresh
startBtn.addEventListener("click", start);
refreshBtn.addEventListener("click", refresh);

//function that sarts the timer
function start() {
    teas.forEach(tea => {
        if (!intervalIds[tea.id]) {
            intervalIds[tea.id] = setInterval(() => updateTimer(tea), 1000);
            isTimerRunning = true;
        }
    });
}

//tried to reset the timer for each type of tea button it was pausing the timer
function refresh() {
    //teas.forEach(tea => {
        //if(intervalIds[tea.id]) {
            //clearInterval(intervalIds[tea.id]);
            //intervalIds[tea.id] = null;
            //tea.time = getInitialTime(tea.id); 
            //isTimerRunning = false;
            //setTimeout(tea.id);
        //}  
   // });
   window.location.reload(true);
}

//function that is running the timer
function updateTimer(tea) {
    const { id, time } = tea;

    if (time <= 0) {
        clearInterval(intervalIds[id]);
        intervalIds[id] = null;
    }

    const min = Math.floor(time / 60);
    const sec = time % 60;
    const minStr = min < 10 ? '0' + min : min;
    const secStr = sec < 10 ? '0' + sec : sec;

    const countdownElement = document.getElementById(`countdown-${id}`);
    countdownElement.textContent = `${minStr}:${secStr}`;
    //stops the timer at zero
    tea.time = time <= 0 ? 0 : time - 1;
}

function getInitialTime(teaId) {
    switch (teaId) {
        case "herbal":
            return starting10Minutes * 60;
        case "white":
            return starting3Minutes * 60;
        case "green":
            return starting2Minutes * 60;
        case "yellow":
            return starting2Minutes * 60;
        case "oolong":
            return starting2Minutes * 60;
        case "black":
            return starting3Minutes * 60;
        case "dark":
            return starting2Minutes * 60;
        default:
            return 0;
    }
}

// Initialisez les minuteries au chargement de la page
teas.forEach(tea => updateTimer(tea));
