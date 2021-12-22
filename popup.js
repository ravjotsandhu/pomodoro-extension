let nextMode = ''
let currtime
const pomodoro = document.getElementById('Pomodoro')
const shortbreak = document.getElementById('Short-break')
const longbreak = document.getElementById('Long-break')
// const start = document.querySelector(".btn-start");
// let timer = document.querySelector(".container-timer");
let hrs = document.querySelector('.hrs')
let mins = document.querySelector('.mins')
let secs = document.querySelector('.secs')
let startpause = document.getElementById('btn-start')
let reset = document.getElementById('reset')
let settings = document.getElementById('settings-popup')

const setting = document.getElementById('settings-popup')
const closepopup = document.getElementById('cross')
const inputLongBreak = document.querySelector('.input-long-break')
let counter = 0
let g_interval
let bool = false

pomodoro.addEventListener('click', function () {
    pomodoro.classList.add('active')
    shortbreak.classList.remove('active')
    longbreak.classList.remove('active')
    clearInterval(g_interval)
})
shortbreak.addEventListener('click', function () {
    pomodoro.classList.remove('active')
    shortbreak.classList.add('active')
    longbreak.classList.remove('active')
    clearInterval(g_interval)
})
longbreak.addEventListener('click', function () {
    pomodoro.classList.remove('active')
    shortbreak.classList.remove('active')
    longbreak.classList.add('active')
    clearInterval(g_interval)
})

reset.addEventListener('click', function () {
    hrs.innerText = '00'
    mins.innerText = '00'
    secs.innerText = '00'
    clearInterval(g_interval)
    if (startpause.innerText === 'Pause') {
        startpause.innerText = 'Start'
    }
})

// // timer.addEventListener("dbclick", function () { });
// // start.addEventListener("click", function () {});

// function startTimer() {
startpause.addEventListener('click', function () {
    if (!bool) {
        startpause.innerText = 'Pause'
        if (pomodoro.classList.contains('active')) {
            g_interval = pomodoroTimer()
        } else if (shortbreak.classList.contains('active')) {
            g_interval = shortBreakTimer()
        } else if (longbreak.classList.contains('active')) {
            g_interval = longBreakTimer()
        }
        bool = true
    } else {
        startpause.innerText = 'Start'
        clearTimeout(g_interval)
        bool = false
    }
})
// }

// function editTimer() {}
//function getRemainingTime() {}
function pomodoroTimer() {
    let time = 0.5 * 60
    let interval = setInterval(function () {
        time--
        let hr = Math.floor(time / 3600)
        let min = Math.floor((time % 3600) / 60)
        let sec = time % 60
        hrs.innerText = hr
        mins.innerText = min
        secs.innerText = sec
        currtime = document.querySelector('.container-timer').innerText
        if (time === 0) {
            counter++
            nextMode = 'shortbreak'
            clearInterval(interval)
            checkNextTimer()
        }
    }, 1000)
    return interval
}
function shortBreakTimer() {
    let time = 0.5 * 60
    let interval = setInterval(function () {
        time--
        let hr = Math.floor(time / 3600)
        let min = Math.floor((time % 3600) / 60)
        let sec = time % 60
        hrs.innerText = hr
        mins.innerText = min
        secs.innerText = sec
        if (time === 0) {
            clearInterval(interval)
            if (counter == inputLongBreak.value) {
                nextMode = 'longbreak'
                counter = 0
            } else {
                nextMode = 'pomodoro'
            }
            checkNextTimer()
        }
    }, 1000)
    return interval
}
function longBreakTimer() {
    let time = 0.5 * 60
    let interval = setInterval(function () {
        time--
        let hr = Math.floor(time / 3600)
        let min = Math.floor((time % 3600) / 60)
        let sec = time % 60
        hrs.innerText = hr
        mins.innerText = min
        secs.innerText = sec
        if (time === 0) {
            clearInterval(interval)
            nextMode = 'pomodoro'
            checkNextTimer()
        }
    }, 1000)
    return interval
}

function checkNextTimer() {
    if (nextMode === 'pomodoro') {
        clearInterval(g_interval)
        pomodoro.classList.add('active')
        shortbreak.classList.remove('active')
        longbreak.classList.remove('active')
        g_interval = pomodoroTimer()
    } else if (nextMode === 'shortbreak') {
        clearInterval(g_interval)
        pomodoro.classList.remove('active')
        shortbreak.classList.add('active')
        longbreak.classList.remove('active')
        g_interval = shortBreakTimer()
    } else if (nextMode === 'longbreak') {
        clearInterval(g_interval)
        pomodoro.classList.remove('active')
        shortbreak.classList.remove('active')
        longbreak.classList.add('active')
        g_interval = longBreakTimer()
    }
}

setting.addEventListener('click', () => {
    overlay.classList.add('active')
})

closepopup.addEventListener('click', () => {
    overlay.classList.remove('active')
})
