import {Schedule} from "./schedule";
import {GPIO} from "./gpio";
import {Module} from "../module";
import * as schedule from "node-schedule";
import {State, Mode} from "./enum";

export class LightModule extends Module {
	private _state: State;
	private _mode: Mode;
	private _job: schedule.Job;
	private _schedule = new Schedule();
	private _gpio = new GPIO();

	public start(): boolean {
		if (!super.start())
			return false;
		if (!this._gpio.initialize() || !this.switchToAutomaticMode()) {
			return false;
		}
		return true;
	}

	public stop(): boolean {
		this.cancelJob();
		this._mode = undefined;
		this._state = undefined;
		this._gpio.setState(State.Off);
		this._gpio.destroy();
		return super.stop();
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

	get schedule(): Schedule {
		return this._schedule;
	}

	public switchToAutomaticMode(): boolean {
		if (this.isStopped() || this.isAutomaticallyControlled()) {
			return false
		}

		this.scheduleJob();
		this._mode = Mode.Automatic;
		this._state = this._schedule.currentState;
		return this._gpio.setState(this.state);
	}

	public switchToManualMode(state: State): boolean {
		if (this.isStopped() || this.isManuallyControlled()) {
			return false
		}

		this.cancelJob()
		this._mode = Mode.Manual;
		this._state = state;
		return this._gpio.setState(this.state);
	}

	private scheduleJob() {
	    if (this._job) {
	        return
        }

		this._job = schedule.scheduleJob('0 * * * *', () => {
			this._state = this._schedule.currentState;
			this._gpio.setState(this.state);
		});
	}

	private cancelJob() {
		if (!this._job) {
			return
		}

		this._job.cancel();
		this._job = undefined;
	}
}
