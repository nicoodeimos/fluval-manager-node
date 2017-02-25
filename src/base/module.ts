import {JSONSerializable} from "../json/serializable";

export enum Status {
    Stopped = 0,
    Started
}

export class Module implements JSONSerializable {
    private _status = Status.Stopped;

    get status(): Status {
        return this._status;
    }

    public isStarted(): boolean {
        return this.status == Status.Started;
    }

    public isStopped(): boolean {
        return this.status == Status.Stopped;
    }

    public start(): boolean {
        if (this.isStarted()) {
            return false
        }
        this._status = Status.Started;
        return true;
    }

    public stop(): boolean {
        if (this.isStopped()) {
            return false
        }
        this._status = Status.Stopped;
        return true;
    }

    public toJSON(): Object {
        return {
            status: this.status
        }
    }

}