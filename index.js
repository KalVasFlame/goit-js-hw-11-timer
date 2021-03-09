const refs = {
  timer: document.querySelector('#timer1'),
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]')
}
const makeSettings = ({days, hours, mins, secs}) => { 
refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
}
const makeTimer = time => {
  const settings = {
    days: pad(Math.floor(time / (1000 * 60 * 60 * 24))),
    hours: pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
    mins: pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))),
    secs: pad(Math.floor((time % (1000 * 60)) / 1000)),
  }
makeSettings(settings)
}


class Timer { 
  constructor({ selector, targetDate }) { 
    this.selector = selector;
    this.targetDate = targetDate.getTime();
  }
  start() {
    
    makeTimer(0)
    const intId = setInterval(() => {
    const currentTime = Date.now()
    const remainingTime = this.targetDate - currentTime;
      
      if (remainingTime < 0) {
        clearInterval(intId);
        makeTimer()
        return;
      }
  
    makeTimer(remainingTime)
}, 1000);
}
}

const pad = value => String(value).padStart(2, '0')



const timer = new Timer({
  selector: '#timer-1',
  targetDate: new Date(2021, 2, 21),
});

timer.start()