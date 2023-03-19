const options = document.querySelectorAll('.option');
const timerPomodoro = document.querySelector('.timer-pomodoro');
const timerBreak = document.querySelector('.timer-break');
let pomodoroTimer = {
  seconds: 1500,
  initial: '25:00'
};
let breakTimer = {
  seconds: 300,
  initial: '05:00'
};
let timerId;

options.forEach(option => {
  option.addEventListener('click', function(){
    selectOption(option);
    showTimer(option);
  })
});

function selectOption(option){
  const selectedOption = document.querySelector('.option.selected-option');
  selectedOption.classList.remove('selected-option');
  option.classList.add('selected-option');
}

function createTimer(seconds){
  const data = new Date(seconds * 1000);
  return data.toLocaleTimeString('pt-BR', {
    hour12: false,
    minute: '2-digit',
    second: '2-digit'
  })
}

function showTimer(option){
  const selectedTimer = document.querySelector('.timer.selected-timer');
  const classElementTimer = `timer-${option.id}`;
  const timerShown = document.querySelector(`.${classElementTimer}`);
  selectedTimer.classList.remove('selected-timer');
  resetTimer(selectedTimer);
  timerShown.classList.add('selected-timer');
}

function startTimer(seconds, optionTimer){
  timerId = setInterval(function(){
    seconds--;
    optionTimer.innerHTML = createTimer(seconds);
  }, 1000);
}

function resetTimer(timer){
  clearInterval(timerId);
  if(timer.classList.contains('timer-pomodoro')){
    timer.innerHTML = pomodoroTimer.initial;
  }

  if(timer.classList.contains('timer-break')){
    timer.innerHTML = breakTimer.initial;
  }
}

document.addEventListener('click', function(event) {
  const element = event.target;

  if(element.classList.contains('start')) {
    if(timerPomodoro.classList.contains('selected-timer')){
      clearInterval(timerId);
      timerPomodoro.classList.remove('paused');
      timerPomodoro.innerHTML = pomodoroTimer.initial;
      startTimer(pomodoroTimer.seconds, timerPomodoro);
    }

    if(timerBreak.classList.contains('selected-timer')){
      clearInterval(timerId);
      timerBreak.classList.remove('paused');
      timerBreak.innerHTML = breakTimer.initial;
      startTimer(breakTimer.seconds, timerBreak);
    }
  }

  if(element.classList.contains('pause')) {
    if(timerPomodoro.classList.contains('selected-timer')){
      clearInterval(timerId);
      timerPomodoro.classList.add('paused');
    }

    if(timerBreak.classList.contains('selected-timer')){
      clearInterval(timerId);
      timerBreak.classList.add('paused');
    }
  }
});