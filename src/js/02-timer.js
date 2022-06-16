import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataAtributes = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedTime = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    selectedTime = selectedDates[0].getTime();
    if (selectedTime <= Date.now()) {
      startBtn.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

startBtn.addEventListener('click', onClickStart);

flatpickr('#datetime-picker', options);

function onClickStart() {
  timerId = setInterval(function () {
    let timeDifrence = selectedTime - Date.now();

    let { days, hours, minutes, seconds } = convertMs(timeDifrence);
    if (selectedTime > Date.now()) {
      dataAtributes.daysEl.textContent = days;
      dataAtributes.hoursEl.textContent = hours;
      dataAtributes.minutesEl.textContent = minutes;
      dataAtributes.secondsEl.textContent = seconds;
    } else {
      clearInterval(timerId);
      startBtn.setAttribute('disabled', 'true');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
