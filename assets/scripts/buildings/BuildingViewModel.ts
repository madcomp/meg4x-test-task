import { Vec3 } from "cc";
import { IBuildingModel } from "./IBuildingModel";
import { IBuildingViewModel } from "./IBuildingViewModel";
import { UIManager } from "../ui/UIManager";

export abstract class BuildingViewModel<T extends IBuildingModel> implements IBuildingViewModel {
    
    constructor(
        protected uiManager: UIManager,
        protected readonly model: T)
    {}
    
    getId(): string {
        return this.model.getId();
    }
    
    getPosition(): Vec3 {
        return this.model.getPosition();
    }

    abstract select(): void;
}


