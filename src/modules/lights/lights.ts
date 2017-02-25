import {Schedule} from "./schedule";
import {GPIO} from "./gpio";
import {State, Mode} from "./enum";
import {Module} from "../../base/module";
import * as schedule from "node-schedule";

export class LightModule extends Module {

	private _state: State;
	private _mode: Mode;
	private _job: schedule.Job;
	private _schedule: Schedule;
	private _gpio: GPIO;

	constructor(schedule?: Schedule, gpio?: GPIO) {
		super();

		this._schedule = schedule && schedule.isValid() ? schedule : new Schedule();
		this._gpio = gpio ? gpio : new GPIO();
	}

	public start(): boolean {
		if (!super.start())
			return false;
		if (!this._gpio.initialize() || !this.switchToAutomaticMode()) {
			return false;
		}
		return true;
	}

	public stop(): boolean {
        if (!super.stop())
            return false;
        this.cancelJob();
		this._mode = undefined;
		this._state = undefined;
		this._gpio.setState(State.Off);
		this._gpio.destroy();
		return true;
	}

	get state(): State {
		return this._state;
	}

	public isManuallyControlled(): boolean {
		return this._mode == Mode.Manual;
	}

	public isAutomaticallyControlled(): boolean {
		return this._mode == Mode.Automatic;
	}

	get mode(): Mode {
		return this._mode;
	}

	public setMode(mode: Mode, state?: State): boolean {
		switch (mode) {
			case Mode.Automatic:
				return this.switchToAutomaticMode()
			case Mode.Manual:
                return this.switchToManualMode(state)
			default:
				break;
		}
		return false
	}

	public setSchedule(schedule: Schedule): boolean {
	    if (!schedule.isValid()) {
	        return false;
        }
        this._schedule = schedule;
	    if (this.isAutomaticallyControlled()) {
            return this.applyStateFromSchedule();
        }
	    return true;
    }

    public toJSON(): Object {
		let json = super.toJSON();
		json['state'] = this.state;
		json['mode'] = this.mode;
		json['schedule'] = this._schedule.toJSON();
		return json;
    }

    private switchToAutomaticMode(): boolean {
		if (this.isStopped() || this.isAutomaticallyControlled()) {
			return false
		}

		this.scheduleJob();
		this._mode = Mode.Automatic;
        return this.applyStateFromSchedule();
	}

	private switchToManualMode(state: State): boolean {
		if (this.isStopped() || (this.isManuallyControlled() && this.state == state)) {
			return false
		}
		if (state != State.Blue && state != State.White && state != State.Off) {
		    return false;
        }

		this.cancelJob()
		this._mode = Mode.Manual;
        return this.applyForcedState(state);
	}

	private scheduleJob() {
	    if (this._job) {
	        return
        }

		this._job = schedule.scheduleJob('0 * * * *', () => {
			this.applyStateFromSchedule();
		});
	}

	private cancelJob() {
		if (!this._job) {
			return
		}

		this._job.cancel();
		this._job = undefined;
	}

	private applyStateFromSchedule(): boolean {
        this._state = this._schedule.currentState;
        return this._gpio.setState(this.state);
    }

    private applyForcedState(state: State): boolean {
        this._state = state;
        return this._gpio.setState(this.state);
    }

}
