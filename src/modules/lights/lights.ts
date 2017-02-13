export enum LightsModuleState {
	White,
	Blue,
	Off
}

export enum LightsModuleMode {
	Automatic,
	Manual
}

export class LightsModule {
	private _state = LightsModuleState.Off;
	private _mode = LightsModuleMode.Automatic;

	get state(): LightsModuleState {
		return this._state;
	}

	get mode(): LightsModuleMode {
		return this._mode;
	}
}