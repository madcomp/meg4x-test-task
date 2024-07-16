import { Vec3 } from 'cc';
import { BuildingInfo } from './BuildingInfo';
import { IBuildingModel } from './IBuildingModel';
import { PlayerModel } from '../player/PlayerModel';

export abstract class BuildingModel<T extends BuildingInfo> implements IBuildingModel {
    constructor(public info: T) {}

    getId(): string {
        return this.info.id;
    }

    getPosition(): Vec3 {
        return this.info.position;
    }

    update(deltaTime: number, playerModel: PlayerModel): void {}
}