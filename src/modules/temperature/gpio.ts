import * as exec from "child_process";
import * as os from "os";

export class GPIO {
    private _initialized = false;

    public isInitialized(): boolean {
        return this._initialized;
    }

    public initialize(): boolean {
        if (this.isInitialized()) {
            return false;
        }

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

    public readTemperature(): string {
        let command = "find /sys/bus/w1/devices/ -name \"28-*\" -exec cat {}/w1_slave \; | grep \"t=\" | awk -F \"t=\" '{print $2/1000}'"
        return this.execCommand(command);
    }

    private execCommand(command: string): string {
        if (os.platform() == 'darwin') {
            return "";
        }
        return exec.execSync(command).toString();
    }

}