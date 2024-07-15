import { Vec3 } from "cc";
import { IBuildingModel } from "./IBuildingModel";
import { IBuildingViewModel } from "./IBuildingViewModel";

export abstract class BuildingViewModel<T extends IBuildingModel> implements IBuildingViewModel {
    constructor(protected readonly model: T) {}
    getId(): string {
        return this.model.getId();
    }
    getPosition(): Vec3 {
        return this.model.getPosition();
    }
}


