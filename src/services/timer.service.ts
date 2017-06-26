import { Injectable, EventEmitter } from '@angular/core';
import { NotificationService } from './notification.service';
import moment from 'moment';

@Injectable()
export class TimerService {

    public timerInterval: any;
    public startTimeStamp: any;
    public currentTime: any;
    public timeLeft: any;
    public resetRefreshes: EventEmitter<boolean> = new EventEmitter();

    constructor(private notificationService: NotificationService) {
    }

    getTimeLeft() {
        return `${this.timeLeft.format('HH')} hrs ${this.timeLeft.format('mm')} mins`;
    }

    resetTimeLeft() {
        this.timeLeft = moment().endOf('day');
    }

    clearTimerInterval() {
        clearInterval(this.timerInterval);
    }

    getRestartDate() {
        let then = moment();
        // then.add('hours', this.timeLeft.hours());
        // then.add('minutes', this.timeLeft.minutes());

        then.add('minute', 2);
        return then;
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
            console.log('Minutes passed since last open', minutes);
            this.timeLeft = oldTimer.subtract(duration);
        }
    }

    startInterval() {
        this.timerInterval = setInterval(() => {
            this.timeLeft.subtract('minute', 1);

            if (this.timeLeft.format('HH:mm') === '00:00') {
                this.resetRefreshes.emit(true);
                this.resetTimeLeft();
                this.notificationService.scheduleNotificationAtTime(this.getRestartDate());
            }
        }, 1000 * 60); // run every minute
    }

}