const refs = {
  timer: document.querySelector('#timer1'),
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]')
}

const makeTimer = time => { 
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
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