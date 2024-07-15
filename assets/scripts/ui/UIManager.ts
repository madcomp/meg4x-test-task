import { BuildingModelHireTower } from "../building/hireTower/BuildingModelHireTower";
import { BuildingPopupViewModelHireTower } from "../building/hireTower/BuildingPopupViewModelHireTower";
import { ViewFactory } from "../factory/ViewFactory";

export class UIManager {
    
    constructor(private viewFactory: ViewFactory) {}

    showBuildingPopupViewHireTower(buildingModelHireTower: BuildingModelHireTower) {
        var viewModel = new BuildingPopupViewModelHireTower(this, buildingModelHireTower);
        var view = this.viewFactory.createBuildingPopupView(viewModel);
    }
}


