import { Vec3 } from 'cc';
import { BuildingInfo } from './BuildingInfo';
import { IBuildingModel } from './IBuildingModel';

export abstract class BuildingModel<T extends BuildingInfo> implements IBuildingModel {
    constructor(public info: T) {}

    getId(): string {
        return this.info.id;
    }

    getPosition(): Vec3 {
        return this.info.position;
    }
}