import * as exec from "child_process";
import * as util from "util";
import * as os from "os";
import {Status} from "../../base/module";

export class GPIO {
    private static POWER_PIN = 13;
    private _initialized = false;

    public isInitialized(): boolean {
        return this._initialized;
    }

    public initialize(): boolean {
        if (this.isInitialized()) {
            return false;
        }

        this.execCommand(util.format("gpio mode %d out", GPIO.POWER_PIN));
        this.setState(Status.Stopped);
        this._initialized = true;
        return true;
    }

    public destroy(): boolean {
        if (!this.isInitialized()) {
            return false;
        }

        this._initialized = false;
        return true;
    }

    public setState(status: Status): boolean {
        if (!this.isInitialized()) {
            return false
        }

        switch (status) {
            case Status.Stopped:
                this.execCommand(util.format("gpio write %d 1", GPIO.POWER_PIN));
                return true;
            case Status.Started:
                this.execCommand(util.format("gpio write %d 0", GPIO.POWER_PIN));
                return true;
            default:
                return false;
        }
    }

    private execCommand(command: string) {
        if (os.platform() == 'darwin') {
            return
        }
        exec.execSync(command);
    }
}