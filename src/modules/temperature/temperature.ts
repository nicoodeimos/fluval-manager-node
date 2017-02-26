import {Module} from "../../base/module";
import {GPIO} from "./gpio";

export class TemperatureModule extends Module {

    private _gpio = new GPIO();

    public start(): boolean {
        if (!super.start())
            return false;
        if (!this._gpio.initialize()) {
            return false;
        }
        return true;
    }

    public stop(): boolean {
        if (!super.stop())
            return false;
        if (!this._gpio.destroy())
            return false;
        return true;
    }

}
