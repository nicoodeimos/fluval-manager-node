import {Module} from "../../base/module";
import {GPIO} from "./gpio";
import Timer = NodeJS.Timer;
import {isUndefined} from "util";

export class TemperatureModule extends Module {

    private _gpio = new GPIO();
    private _temperature: number;
    private _interval: Timer;

    public start(): boolean {
        if (!super.start())
            return false;
        if (!this._gpio.initialize()) {
            return false;
        }
        this.updateTemperature();
        this.scheduleUpdate(true)
        return true;
    }

    public stop(): boolean {
        if (!super.stop())
            return false;
        if (!this._gpio.destroy())
            return false;
        this._temperature = undefined
        this.scheduleUpdate(false)
        return true;
    }

    public toJSON(): Object {
        let json = super.toJSON();
        json['temperature'] = this._temperature;
        return json;
    }

    private updateTemperature() {
        let value = this._gpio.readTemperature()
        if (value != "") {
            this._temperature = parseFloat(value)
        } else {
            this._temperature = 0.0;
        }
    }

    private scheduleUpdate(active: boolean) {
        if (active) {
            this._interval = setInterval(() => {
                this.updateTemperature()
            }, 5000)
        } else {
            clearInterval(this._interval)
            this._interval = undefined
        }
    }

}
