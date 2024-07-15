import { instantiate, Node } from "cc";
import { BuildingIds } from "../Constants";
import { BuildingPopupViewHireTower } from "../building/hireTower/BuildingPopupViewHireTower";
import { BuildingPopupViewModelHireTower } from "../building/hireTower/BuildingPopupViewModelHireTower";
import { BuildingPrefabs } from "../building/BuildingPrefabs";
import { BuildingViewHireTower } from "../building/hireTower/BuildingViewHireTower";
import { BuildingViewModelHireTower } from "../building/hireTower/BuildingViewModelHireTower";
import { IBuildingPopupViewModel } from "../building/IBuildingPopupViewModel";
import { IBuildingViewModel } from "../building/IBuildingViewModel";

export class ViewFactory {

    private prefabsByBuildingId: Map<string, BuildingPrefabs>;

    constructor(
        buildingsPrefabs: BuildingPrefabs[],
        private popupParent: Node,
        private viewsParent: Node
    ) {
        this.prefabsByBuildingId = new Map();
        for (var buildingPrefabs of buildingsPrefabs)
        {
            this.prefabsByBuildingId.set(buildingPrefabs.buildingId, buildingPrefabs);
        }
    }

    createBuildingPopupView(buildingPopupViewModel: IBuildingPopupViewModel) {
        let buildingId = buildingPopupViewModel.getId();
        const prefabs = this.prefabsByBuildingId.get(buildingId);
        
        if (!prefabs || !prefabs.buildingPopupView)
        {
            throw new Error("No valid building prefabs for id=${buildingId}.");
        }
        
        switch (buildingId)
        {
            case BuildingIds.HireTower: {
                if (this.isBuildingPopupViewModelHireTower(buildingPopupViewModel))
                {
                    let view = instantiate(prefabs.buildingPopupView).getComponent(BuildingPopupViewHireTower)!;
                    this.popupParent.addChild(view.node);
                    view.init(buildingPopupViewModel);
                    return view;
                }
                throw new Error("No valid buildingPopupViewModel for id=${buildingId}.");
            }
        }

        throw new Error("No building prefabs for id=${buildingId}.");
    }

    createBuildingView(buildingViewModel: IBuildingViewModel) {
        let buildingId = buildingViewModel.getId();
        const prefabs = this.prefabsByBuildingId.get(buildingId);
        
        if (!prefabs || !prefabs.buildingView)
        {
            throw new Error("No valid building prefabs for id=${buildingId}.");
        }
        
        switch (buildingId)
        {
            case BuildingIds.HireTower: {
                if (this.isBuildingViewModelHireTower(buildingViewModel))
                {
                    let view = instantiate(prefabs.buildingView).getComponent(BuildingViewHireTower)!;
                    this.viewsParent.addChild(view.node);
                    view.init(buildingViewModel);
                    return view;
                }
                throw new Error("No valid buildingViewModel for id=${buildingId}.");
            }
        }

        throw new Error("No building prefabs for id=${buildingId}.");
    }

    private isBuildingPopupViewModelHireTower(viewModel: IBuildingPopupViewModel): viewModel is BuildingPopupViewModelHireTower {
        return viewModel instanceof BuildingPopupViewModelHireTower;
    }

    private isBuildingViewModelHireTower(viewModel: IBuildingViewModel): viewModel is BuildingViewModelHireTower {
        return viewModel instanceof BuildingViewModelHireTower;
    }
}