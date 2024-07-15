import { BuildingInfos } from "../building/BuildingInfos";
import { BuildingModelHireTower } from "../building/hireTower/BuildingModelHireTower";
import { BuildingViewModelHireTower } from "../building/hireTower/BuildingViewModelHireTower";
import { IBuildingModel } from "../building/IBuildingModel";
import { IBuildingViewModel } from "../building/IBuildingViewModel";
import { BuildingIds } from "../Constants";
import { UIManager } from "../ui/UIManager";

export class ModelViewModelFactory {

    constructor(private buildingInfos: BuildingInfos, private uiManager: UIManager) {}

    createBuildingModel(buildingId: string) : IBuildingModel {
        switch (buildingId)
        {
            case BuildingIds.HireTower:
                return new BuildingModelHireTower(this.buildingInfos.buildingInfoHireTower);
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