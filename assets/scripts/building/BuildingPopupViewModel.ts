import { IBuildingModel } from "./IBuildingModel";
import { IBuildingPopupViewModel } from "./IBuildingPopupViewModel";
import { UIManager } from "../ui/UIManager";

export abstract class BuildingPopupViewModel<T extends IBuildingModel> implements IBuildingPopupViewModel {
    
    constructor(
        protected uiManager: UIManager,
        protected readonly model: T)
    {}
    
    getId(): string {
        return this.model.getId();
    }
}


