let nextMode = ''
let currtime

const audio = document.querySelector('audio')
const pomodoro = document.getElementById('Pomodoro')
const shortbreak = document.getElementById('Short-break')
const longbreak = document.getElementById('Long-break')

let hrs = document.querySelector('.hrs')
let mins = document.querySelector('.mins')
let secs = document.querySelector('.secs')
let startpause = document.getElementById('btn-start')
let reset = document.getElementById('reset')
let settings = document.getElementById('settings-popup')

const setting = document.getElementById('settings-popup')
const closepopup = document.getElementById('cross')
const inputLongBreak = document.querySelector('.interval-longbreak')

const pomodoroLength = document.querySelector('.input-pomodoro')
const shortBreakLength = document.querySelector('.input-shortbreak')
const longBreakLength = document.querySelector('.input-longbreak')

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
    localStorage.setItem('second', JSON.stringify(getRemainingTime()))
    clearInterval(g_interval)
    if (startpause.innerText === 'Pause') {
        startpause.innerText = 'Start'
    }
})

setting.addEventListener('click', () => {
    overlay.classList.add('active')
})

closepopup.addEventListener('click', () => {
    overlay.classList.remove('active')
})

localStorage.setItem('second', JSON.stringify(getRemainingTime()))
if (JSON.parse(localStorage.getItem('second')) > 0) {
    let time = JSON.parse(localStorage.getItem('second'))
    let hr = Math.floor(time / 3600)
    let min = Math.floor((time % 3600) / 60)
    let sec = time % 60
    hrs.innerText = hr
    mins.innerText = min
    secs.innerText = sec
}
startpause.addEventListener('click', function () {
    if (!bool && JSON.parse(localStorage.getItem('second')) === 0) {
        startpause.innerText = 'Pause'
        if (pomodoro.classList.contains('active')) {
            g_interval = pomodoroTimer(parseInt(pomodoroLength.value))
        } else if (shortbreak.classList.contains('active')) {
            g_interval = shortBreakTimer(parseInt(shortBreakLength.value))
        } else if (longbreak.classList.contains('active')) {
            g_interval = longBreakTimer(parseInt(longBreakLength.value))
        }
        bool = true
    } else if (!bool && JSON.parse(localStorage.getItem('second')) > 0) {
        startpause.innerText = 'Pause'
        let minutes = Math.floor(
            JSON.parse(localStorage.getItem('second')) / 60
        )
        let sec = JSON.parse(localStorage.getItem('second')) - minutes * 60
        minutes = minutes + sec / 60
        // console.log(minutes)
        if (pomodoro.classList.contains('active')) {
            g_interval = pomodoroTimer(minutes)
        } else if (shortbreak.classList.contains('active')) {
            g_interval = shortBreakTimer(minutes)
        } else if (longbreak.classList.contains('active')) {
            g_interval = longBreakTimer(minutes)
        }
        bool = true
    } else {
        startpause.innerText = 'Start'
        clearInterval(g_interval)
        bool = false
    }
})

function getRemainingTime() {
    let time = document.querySelector('.container-timer').innerText
    // console.log(time)
    let hr = parseInt(time.split(':')[0])
    let min = parseInt(time.split(':')[1])
    let sec = parseInt(time.split(':')[2])
    return hr * 3600 + min * 60 + sec
}

function pomodoroTimer(t) {
    let time = t * 60
    let interval = setInterval(function () {
        time--
        localStorage.setItem('second', JSON.stringify(getRemainingTime()))
        let hr = Math.floor(time / 3600)
        let min = Math.floor((time % 3600) / 60)
        let sec = time % 60
        hrs.innerText = hr
        mins.innerText = min
        secs.innerText = sec
        if (time === 0) {
            audio.play()
            counter++
            nextMode = 'shortbreak'
            clearInterval(interval)
            checkNextTimer()
        }
    }, 1000)
    return interval
}
function shortBreakTimer(t) {
    let time = t * 60
    let interval = setInterval(function () {
        time--
        localStorage.setItem('second', JSON.stringify(getRemainingTime()))
        let hr = Math.floor(time / 3600)
        let min = Math.floor((time % 3600) / 60)
        let sec = time % 60
        hrs.innerText = hr
        mins.innerText = min
        secs.innerText = sec
        if (time === 0) {
            audio.play()
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
function longBreakTimer(t) {
    let time = t * 60
    let interval = setInterval(function () {
        time--
        localStorage.setItem('second', JSON.stringify(getRemainingTime()))
        let hr = Math.floor(time / 3600)
        let min = Math.floor((time % 3600) / 60)
        let sec = time % 60
        hrs.innerText = hr
        mins.innerText = min
        secs.innerText = sec
        if (time === 0) {
            audio.play()
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
        g_interval = pomodoroTimer(parseInt(pomodoroLength.value))
    } else if (nextMode === 'shortbreak') {
        clearInterval(g_interval)
        pomodoro.classList.remove('active')
        shortbreak.classList.add('active')
        longbreak.classList.remove('active')
        g_interval = shortBreakTimer(parseInt(shortBreakLength.value))
    } else if (nextMode === 'longbreak') {
        clearInterval(g_interval)
        pomodoro.classList.remove('active')
        shortbreak.classList.remove('active')
        longbreak.classList.add('active')
        g_interval = longBreakTimer(parseInt(longBreakLength.value))
    }
}
