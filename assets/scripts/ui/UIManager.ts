import { BuildingModelHireTower } from "../buildings/hireTower/BuildingModelHireTower";
import { ModelViewModelFactory } from "../factory/ModelViewModelFactory";
import { ViewFactory } from "../factory/ViewFactory";
import { PlayerModel } from "../player/PlayerModel";
import { PopupView } from "./PopupView";

export class UIManager {
    
    currentPopupView: PopupView | null = null;

    constructor(
        private playerModel: PlayerModel,
        private modelViewModelFactory: ModelViewModelFactory,
        private viewFactory: ViewFactory
    ) {}

    showBuildingPopupViewHireTower(buildingModelHireTower: BuildingModelHireTower) {
        if (!!this.currentPopupView)
        {
            this.currentPopupView.close();
        }
        var viewModel = this.modelViewModelFactory.createPopupViewModelHireTower(buildingModelHireTower);
        this.currentPopupView = this.viewFactory.createBuildingPopupView(viewModel);
        this.currentPopupView.node.on("close", this.onPopupViewClose, this);
    }

    showHeroesPopupView() {
        if (!!this.currentPopupView)
        {
            this.currentPopupView.close();
        }
        var viewModel = this.modelViewModelFactory.createHeroesPopupViewModel(this.playerModel);
        this.currentPopupView = this.viewFactory.createHeroesPopupView(viewModel);
        this.currentPopupView.node.on("close", this.onPopupViewClose, this);
    }

    private onPopupViewClose() {
        if (!this.currentPopupView)
        {
            return;
        }
        this.currentPopupView?.node.destroy();
        this.currentPopupView = null;
    }
}


