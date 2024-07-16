import { BuildingModelHireTower } from "../buildings/hireTower/BuildingModelHireTower";
import { BuildingViewModelHireTower } from "../buildings/hireTower/BuildingViewModelHireTower";
import { IBuildingModel } from "../buildings/IBuildingModel";
import { IBuildingViewModel } from "../buildings/IBuildingViewModel";
import { BuildingIds } from "../Constants";
import { GameInfo } from "../GameInfo";
import { UIManager } from "../ui/UIManager";

export class ModelViewModelFactory {

    constructor(private gameInfo: GameInfo, private uiManager: UIManager) {}

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
            return new BuildingViewModelHireTower(this.uiManager, buildingModel);
        }
        throw new Error("No valid building view model for id=${buildingModel.getId()}.");
    }

    private isBuildingModelHireTower(model: IBuildingModel): model is BuildingModelHireTower {
        return model instanceof BuildingModelHireTower;
    }
}