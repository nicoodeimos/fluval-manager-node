import {Module, Status} from "../../base/module";
import {GPIO} from "./gpio";

export class FilterModule extends Module {

    private _gpio = new GPIO();

    public start(): boolean {
        if (!super.start())
            return false;
        if (!this._gpio.initialize() || !this._gpio.setState(Status.Started)) {
            return false;
        }
        return true;
    }

    public stop(): boolean {
        if (!super.stop())
            return false;
        if (!this._gpio.setState(Status.Stopped) || !this._gpio.destroy())
            return false;
        return true;
    }

}
