import { IBuildingModel } from "./IBuildingModel";
import { IBuildingPopupViewModel } from "./IBuildingPopupViewModel";
import { UIManager } from "../ui/UIManager";
import { GameInfo } from "../GameInfo";

export abstract class BuildingPopupViewModel<T extends IBuildingModel> implements IBuildingPopupViewModel {
    
    constructor(
        protected gameInfo: GameInfo,
        protected uiManager: UIManager,
        protected readonly model: T)
    {}
    
    getId(): string {
        return this.model.getId();
    }
}


