import {State} from "./lights";

export class GPIO {
    private _initialized = false;

    public isInitialized(): boolean {
        return this._initialized;
    }

    public initialize(): boolean {
        if (this.isInitialized()) {
            return false;
        }

        // TODO
        this._initialized = true;
        return true;
    }

    public destroy(): boolean {
        if (!this.isInitialized()) {
            return false;
        }

        // TODO
        this._initialized = false;
        return true;
    }

    public setState(state: State): boolean {
        if (!this.isInitialized()) {
            return false
        }

        console.log('je sette ' + state);

        switch (state) {
            case State.Off:
                // TODO
                return true;
            case State.White:
                // TODO
                return true;
            case State.Blue:
                // TODO
                return true;
            default:
                return false;
        }
    }
}