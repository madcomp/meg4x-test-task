import { BuildingInfos } from "../building/BuildingInfos";
import { BuildingModelHireTower } from "../building/BuildingModelHireTower";
import { BuildingIds } from "../Constants";

export class ModelFactory {

    private buildingInfos: BuildingInfos;

    constructor(parBuildingInfos: BuildingInfos) {
        this.buildingInfos = parBuildingInfos;
    }

    createBuildingModel(buildingId: string) {
        switch (buildingId)
        {
            case BuildingIds.HireTower:
                return new BuildingModelHireTower(this.buildingInfos.buildingInfoHireTower);
        }
        return null;
    }
}