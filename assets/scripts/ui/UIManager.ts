import { BuildingModelHireTower } from "../buildings/hireTower/BuildingModelHireTower";
import { ModelViewModelFactory } from "../factory/ModelViewModelFactory";
import { ViewFactory } from "../factory/ViewFactory";

export class UIManager {
    
    constructor(private modelViewModelFactory: ModelViewModelFactory, private viewFactory: ViewFactory) {}

    showBuildingPopupViewHireTower(buildingModelHireTower: BuildingModelHireTower) {
        var viewModel = this.modelViewModelFactory.createPopupViewModelHireTower(buildingModelHireTower);
        var view = this.viewFactory.createBuildingPopupView(viewModel);
    }
}


