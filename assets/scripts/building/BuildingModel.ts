import { BuildingInfo } from './BuildingInfo';

export abstract class BuildingModel<T extends BuildingInfo> {
    private _info: T;

    constructor(info: T) {
        this._info = info;
    }

    get info(): T {
        return this._info;
    }
}