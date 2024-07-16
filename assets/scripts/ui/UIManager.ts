import { BuildingModelHireTower } from "../buildings/hireTower/BuildingModelHireTower";
import { BuildingPopupViewModelHireTower } from "../buildings/hireTower/BuildingPopupViewModelHireTower";
import { ViewFactory } from "../factory/ViewFactory";
import { GameInfo } from "../GameInfo";

export class UIManager {
    
    constructor(private gameInfo: GameInfo, private viewFactory: ViewFactory) {}

    showBuildingPopupViewHireTower(buildingModelHireTower: BuildingModelHireTower) {
        var viewModel = new BuildingPopupViewModelHireTower(this.gameInfo, this, buildingModelHireTower);
        var view = this.viewFactory.createBuildingPopupView(viewModel);
    }
}


