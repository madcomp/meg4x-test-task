import { BuildingIds } from "./Constants";
import { BuildingInfos } from "./building/BuildingInfos";
import { BuildingModelHireTower } from "./building/hireTower/BuildingModelHireTower";
import { BuildingPrefabs } from "./building/BuildingPrefabs";
import { BuildingViewModelHireTower } from "./building/hireTower/BuildingViewModelHireTower";
import { IBuildingModel } from "./building/IBuildingModel";
import { IBuildingView } from "./building/IBuildingView";
import { IBuildingViewModel } from "./building/IBuildingViewModel";
import { instantiate, Node, Prefab } from "cc";
import { BuildingViewHireTower } from "./building/hireTower/BuildingViewHireTower";

export class Factory {

    private buildingInfos: BuildingInfos;
    private prefabsByBuildingId: Map<string, BuildingPrefabs>;
    private viewsParent: Node;

    constructor(
        parBuildingInfos: BuildingInfos,
        buildingsPrefabs: BuildingPrefabs[],
        parViewsParent: Node
    ) {
        this.buildingInfos = parBuildingInfos;
        this.prefabsByBuildingId = new Map();
        for (var buildingPrefabs of buildingsPrefabs)
        {
            this.prefabsByBuildingId.set(buildingPrefabs.buildingId, buildingPrefabs);
        }
        this.viewsParent = parViewsParent;
    }

    createBuildingModel(buildingId: string) : IBuildingModel {
        switch (buildingId)
        {
            case BuildingIds.HireTower:
                return new BuildingModelHireTower(this.buildingInfos.buildingInfoHireTower);
        }
        throw new Error("No valid building model for id=${buildingId}.");
    }

    createBuildingView(buildingViewModel: IBuildingViewModel) : IBuildingView {
        let buildingId = buildingViewModel.getId();
        const prefabs = this.prefabsByBuildingId.get(buildingId);
        
        if (!prefabs || !prefabs.buildingView)
        {
            throw new Error("No valid building prefabs for id=${buildingId}.");
        }
        
        switch (buildingId)
        {
            case BuildingIds.HireTower: {
                let view = instantiate(prefabs.buildingView).getComponent(BuildingViewHireTower)!;
                this.viewsParent.addChild(view.node);
                view.init(buildingViewModel as BuildingViewModelHireTower);
                return view;
            }
        }
        
        throw new Error("No building prefabs for id=${buildingId}.");
    }

    createBuildingViewModel(buildingModel: IBuildingModel) : IBuildingViewModel {
        if (this.isBuildingModelHireTower(buildingModel))
        {
            return new BuildingViewModelHireTower(buildingModel);
        }
        throw new Error("No valid building view model for id=${buildingModel.getId()}.");
    }

    private isBuildingModelHireTower(model: IBuildingModel): model is BuildingModelHireTower {
        return model instanceof BuildingModelHireTower;
    }
}