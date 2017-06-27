/**
 * MetronomeAnimation
 */

/*
    Default coordinate framefor canvas:
    
    (0,0)-----> x
    |
    |
    y

    Where the origin is to the top left of the canvas.

    The animation uses a translated coordinate frame where the origin is moved down to the right.
    The y-axis wraps around such that the last 7/8 of a bar are animated as a right-movement from the left edge of the canvas,
    while the first 7/8 are animated as a right movement from the translated origin.
 */

const sigma = 0.027;
const radius = 10;
const offset = -10;

export class MetronomeAnimation {

    private width: number;
    private height: number;

    private ballCanvas: HTMLCanvasElement;

    private gridContext: CanvasRenderingContext2D;
    private ballContext: CanvasRenderingContext2D;

    private animationFrameId: number = 0;
    private running = false;
    private staveOffset: number;

    private nextNote: { progress: number, time: number, tempo: number };

    constructor(private getCurrentTime: () => number,
        private readNoteQue: () => { progress: number, time: number, tempo: number },
        private positions: any) {

        this.ballCanvas = <HTMLCanvasElement>document.getElementById('top-canvas');

        this.width = (positions.lastNotePos - positions.firstNotePos);
        this.staveOffset = positions.staveOffset;
        this.height = 10;
        this.setSize(this.width, this.height);
        this.ballContext = this.ballCanvas.getContext('2d');

        console.log('stave offset', this.staveOffset);
    }

    start() {
        this.updateNoteInfo();
        this.running = true;
        this.animationFrameId = window.requestAnimationFrame(() => { this.drawBall(); });
    }

    stop() {
        this.running = false;
        window.cancelAnimationFrame(this.animationFrameId);
    }

    toggle() {
        if (this.running) {
            this.stop();
        } else {
            this.start();
        }
    }

    private setSize(width: number, height: number) {
        this.ballCanvas.width = width;
        this.ballCanvas.height = height;
    }

    private updateNoteInfo() {
        let data = this.readNoteQue();
        if (!data) return;
        this.nextNote = data;
    }

    private transformToNoteFrame(context: CanvasRenderingContext2D) {
        context.translate(this.width / 8, this.height - radius);
    }

    private drawBall() {
        let ctx = this.ballContext;

        ctx.clearRect(0, 0, this.width, this.height);

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(51,86,56,0.9)';
        ctx.fillStyle = 'rgba(51,86,56,0.5)';

        ctx.save();

        let barPosition = this.getBarPosition();

        this.transformToNoteFrame(ctx);

        // Translate to desired position
        ctx.translate(this.getXoffset(barPosition), this.getYoffset(barPosition));

        // Add circle path at the place we've translated to
        this.circle(ctx, radius);

        // Do stroke
        ctx.restore();
        ctx.stroke();
        ctx.fill();

        this.animationFrameId = window.requestAnimationFrame(() => { this.drawBall(); });
    }

    // Returns percentage of a bar completed. Eg. at exactly two beats it will be 0.5. 
    private getBarPosition(): number {
        this.updateNoteInfo();

        let secondsPerBeat = 60.0 / this.nextNote.tempo;
        let expectedPosition = this.nextNote.progress - 0.25 * (this.nextNote.time - this.getCurrentTime()) / secondsPerBeat;

        if (expectedPosition < 0) {
            expectedPosition = (expectedPosition % 1) + 1;
        }

        return expectedPosition;
    }

    // How much x should be offset from the origin in the note coordinate frame - implements the wrapping at 7/8
    private getXoffset(barPosition: number): number {
        if (barPosition < 7 / 8) {
            return barPosition * this.width - this.staveOffset * 2;
        } else {
            return (- 1 / 8 + (barPosition - 7 / 8)) * this.width - this.staveOffset * 2;
        }
    }

    // How much y should be offset from the origin in the note coordinate frame
    private getYoffset(barPosition: number): number {

        let distanceToOrigin = (barPosition > 0.5) ? 1 - barPosition : barPosition;

        // Gaussian functions to get peaks at the beats
        let amplitude = 2 * Math.exp(- 0.5 * Math.pow(distanceToOrigin / sigma, 2));
        amplitude += Math.exp(- 0.5 * Math.pow((barPosition - 0.25) / sigma, 2));
        amplitude += Math.exp(- 0.5 * Math.pow((barPosition - 0.50) / sigma, 2));
        amplitude += Math.exp(- 0.5 * Math.pow((barPosition - 0.75) / sigma, 2));

        let scaling = - this.height * 1 / 2 * 0.7;
        return scaling * amplitude;
    }

    private circle(context: CanvasRenderingContext2D, radius: number) {
        context.beginPath(); // Note to self: Adding moveTo here creates a line from center of circle on stroke.
        context.arc(0, 0, radius, 0, 2 * Math.PI);
    }
}