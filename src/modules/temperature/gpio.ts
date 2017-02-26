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

}