import {State} from "./enum";
import {JSONSerializable} from "../../json/serializable";
import {isArray} from "util";
import {isNumber} from "util";
import {isUndefined} from "util";

export class Schedule implements JSONSerializable {

    private _schedule: State[] = [];

    constructor(schedule?: State[]) {
        if (isUndefined(schedule)) {
            // nullify schedule
            for (let i = 0; i < 24; i++) {
                this._schedule.push(State.Off);
            }

            // set default state
            this.setState(State.White, 10, 8);
            this.setState(State.Blue, 18, 3);
        }
        else {
            this._schedule = schedule;
        }
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

    public isValid(): boolean {
        return isArray(this._schedule) && this._schedule.length == 24 && this._schedule.reduce((previous, current) => {
            return previous && isNumber(current);
        }, true);
    }

    public toJSON(): Object {
        return {
            duration: this.duration,
            states: this.states
        }
    }

    private setState(state: State, from: number, duration: number) {
        for (let i = 0; i < duration; i++) {
            this._schedule[from + i] = state;
        }
    }

}