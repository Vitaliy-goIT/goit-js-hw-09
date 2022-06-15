import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
let timerId = null;
const nowTime = Date.now();
let timeDifrence = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].getTime());
    let selectedTime = selectedDates[0].getTime();
    if (selectedTime <= nowTime) {
      startBtn.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      console.log(selectedTime - nowTime);
    }
  },
};

console.log(timeDifrence);
startBtn.addEventListener('click', onClickStart);

flatpickr('#datetime-picker', options);
function onClickStart() {}
