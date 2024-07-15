import { BuildingInfo } from './BuildingInfo';
import { BuildingInfoHireTower } from './BuildingInfoHireTower';
import { BuildingModel } from './BuildingModel';

export class BuildingModelHireTower extends BuildingModel<BuildingInfoHireTower> {
    constructor(info: BuildingInfoHireTower) {
        super(info);
    }
}