import { Injectable, EventEmitter } from '@angular/core';
import moment from 'moment';

@Injectable()
export class TimerService {

    public timerInterval: any;
    public startTimeStamp: any;
    public currentTime: any;
    public timeLeft: any;
    public resetRefreshes: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    getTimeLeft() {
        return `${this.timeLeft.format('HH')} hrs ${this.timeLeft.format('mm')} mins`;
    }

    resetTimeLeft() {
        this.timeLeft = moment().endOf('day');
        console.log('timer reset to', this.timeLeft.format('HH:mm'));
    }

    clearTimerInterval() {
        clearInterval(this.timerInterval);
    }

    updateCurrentTimerOnOpen(previousTimer: string, logOutTime: string) {
        let now = moment();
        let oldTimer = moment(previousTimer, 'YYYY-MM-DD HH:mm');
        let logout = moment(logOutTime, 'YYYY-MM-DD HH:mm');

        let duration = moment.duration(now.diff(logout));
        let minutes = duration.asMinutes();

        if (Math.abs(minutes) >= 1430) {
            console.log('more than a day has passed, RESET THE SHIT');
            this.resetRefreshes.emit(true);
            this.resetTimeLeft();
        } else {
            console.log('Minutes passed since last open', duration);
            console.log('Minutes passed since last open', minutes);
            this.timeLeft = oldTimer.subtract(duration);
        }
    }

    startInterval() {
        this.timerInterval = setInterval(() => {
            this.timeLeft.subtract('minute', 1);
            console.log('countdown', this.timeLeft.format('HH:mm'));

            if (this.timeLeft.format('HH:mm') === '00:00') {
                console.log('RESET THE SHIT');
                this.resetRefreshes.emit(true);
                this.resetTimeLeft();
            }
        }, 1000 * 60); // run every minute
    }

}