const colors = ['red', 'green', 'blue'];

// set random colors
let currentColor = colors[Math.floor(Math.random() * colors.length)];

// Assign each button with eventListener
const assignEventListener = () => {
  const buttons = document.querySelectorAll('.color__item');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      handleClick(button);
    });
  });
};

// Handle button click for color changing
const handleClick = button => {
  let active = button.classList.contains('color--active');
  if (!active) {
    let prevColor = currentColor;
    currentColor = button.dataset.button;
    changeColor(prevColor, currentColor);
  }
};

const changeColor = (prevColor, curColor) => {
  // Change color in 'day' box
  let dayBox = document.querySelectorAll('.day-box__item');
  dayBox.forEach(e => {
    if (!!prevColor) {
      e.classList.toggle(`text--${prevColor}`);
    }
    if (!!curColor) {
      e.classList.toggle(`text--${curColor}`);
      if (e.classList.contains(`text--${prevColor}-active`)) {
        e.classList.remove(`text--${prevColor}-active`);
        e.classList.add(`text--${curColor}-active`);
      }
    }
  });

  // Change color in 'button' box
  let buttonBox = document.querySelectorAll('.color__item');
  buttonBox.forEach(e => {
    if (e.dataset.button === curColor) {
      e.classList.add('color--active');
      e.classList.add(`text--${e.dataset.button}-active`);
      e.classList.remove(`text--${e.dataset.button}`);
    } else {
      e.classList.remove('color--active');
      e.classList.remove(`text--${e.dataset.button}-active`);
      e.classList.add(`text--${e.dataset.button}`);
    }
  });

  // Change clock color
  let contentItem = document.querySelectorAll('.content__item');
  contentItem.forEach(e => {
    e.classList.remove(`text-clock--${prevColor}`);
    e.classList.add(`text-clock--${curColor}`);
  })

  // Change clock state color
  let clockState = document.getElementById('clock-box__state');
  clockState.classList.remove(`text-clock--${prevColor}`);
  clockState.classList.add(`text-clock--${curColor}`);
};

// Set Time
const setTime = () => {
  let time = new Date();
  let rawHour = time.getHours();
  let state = rawHour >= 12 ? 'PM' : 'AM';

  let hour   = ('0' + (rawHour === 12 ? 12 : (rawHour % 12))).slice(-2);
  let minute = ('0' + time.getMinutes()).slice(-2);
  let second = ('0' + time.getSeconds()).slice(-2);

  let dayBox = document.querySelectorAll('.day-box__item');
  let day = time.getDay();
  if (!dayBox[day].classList.contains(`active-${currentColor}`)) {
    dayBox.forEach((e, index) => {
      if (index === day) {
        e.classList.add(`text--${currentColor}-active`);
      } else {
        e.classList.remove(`text--${currentColor}-active`);
      }
    });
  }

  let contentItem = document.querySelectorAll('.content__item');
  contentItem[0].innerText = hour;
  contentItem[1].innerText = ':';
  contentItem[2].innerText = minute;
  contentItem[3].innerText = ':';
  contentItem[4].innerText = second;

  document.getElementById('clock-box__state').innerText = state;
  document.getElementById('clock-box__state').textContent = state;

  setTimeout(setTime, 1000); // Re-call setTime function in 1000ms
};

// Execution
assignEventListener();
changeColor('', currentColor);
setTime();
