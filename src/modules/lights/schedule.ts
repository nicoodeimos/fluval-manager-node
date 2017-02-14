import {State} from "./lights";

export class Schedule {
    private _schedule: State[] = [];

    constructor() {
        // nullify schedule
        for (let i = 0; i < 24; i++) {
            this._schedule.push(State.Off);
        }

        // set default state
        this.setState(State.White, 10, 8);
        this.setState(State.Blue, 18, 3);
    }

    get duration(): number {
        return this._schedule.reduce((total: number, current: State) => {
            if (current == State.White) {
                return total + 1;
            }
            return total;
        }, 0);
    }

    get states(): State[] {
        return this._schedule;
    }

    get currentState(): State {
        let hours = new Date().getHours();
        return this._schedule[hours];
    }

    private setState(state: State, from: number, duration: number) {
        for (let i = 0; i < duration; i++) {
            this._schedule[from + i] = state;
        }
    }
}