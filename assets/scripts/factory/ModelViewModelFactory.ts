import { BuildingModelHireTower } from "../buildings/hireTower/BuildingModelHireTower";
import { BuildingPopupViewModelHireTower } from "../buildings/hireTower/BuildingPopupViewModelHireTower";
import { BuildingViewModelHireTower } from "../buildings/hireTower/BuildingViewModelHireTower";
import { IBuildingModel } from "../buildings/IBuildingModel";
import { IBuildingViewModel } from "../buildings/IBuildingViewModel";
import { BuildingIds } from "../Constants";
import { GameInfo } from "../GameInfo";
import { HeroModel } from "../heroes/HeroModel";
import { PlayerModel } from "../player/PlayerModel";
import { UIManager } from "../ui/UIManager";

export class ModelViewModelFactory {

    private _playerModel!: PlayerModel;
    private _uiManager!: UIManager;

    constructor(private gameInfo: GameInfo) {}

    init(playerModel: PlayerModel, uiManager: UIManager) {
        this._playerModel = playerModel;
        this._uiManager = uiManager;
    }

    createBuildingModel(buildingId: string) : IBuildingModel {
        switch (buildingId)
        {
            case BuildingIds.HireTower:
                return new BuildingModelHireTower(this.gameInfo.buildingInfos.buildingInfoHireTower);
        }
        throw new Error("No valid building model for id=${buildingId}.");
    }

    createBuildingViewModel(buildingModel: IBuildingModel) : IBuildingViewModel {
        if (this.isBuildingModelHireTower(buildingModel))
        {
            return new BuildingViewModelHireTower(this._uiManager, buildingModel);
        }
        throw new Error("No valid building view model for id=${buildingModel.getId()}.");
    }

    createHeroModel(heroId: string): HeroModel | null {
        let heroInfo = this.gameInfo.heroInfoById.get(heroId);
        if (!!heroInfo)
        {
            return new HeroModel(heroInfo);
        }
        return null;
    }

    createPopupViewModelHireTower(buildingModelHireTower: BuildingModelHireTower) : BuildingPopupViewModelHireTower {
        return new BuildingPopupViewModelHireTower(
            this.gameInfo,
            this._playerModel,
            this._uiManager,
            buildingModelHireTower
        );
    }

    private isBuildingModelHireTower(model: IBuildingModel): model is BuildingModelHireTower {
        return model instanceof BuildingModelHireTower;
    }
}