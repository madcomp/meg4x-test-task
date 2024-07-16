import { BuildingViewModel } from "../BuildingViewModel";
import { BuildingModelHireTower } from "./BuildingModelHireTower";

export class BuildingViewModelHireTower extends BuildingViewModel<BuildingModelHireTower> {
    
    select(): void {
        this.uiManager.showBuildingPopupViewHireTower(this.model);
    }
}


