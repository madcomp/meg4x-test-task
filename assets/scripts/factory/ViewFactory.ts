import { instantiate, Node, SpriteFrame } from "cc";
import { BuildingIds } from "../Constants";
import { BuildingPopupViewHireTower } from "../buildings/hireTower/BuildingPopupViewHireTower";
import { BuildingPopupViewModelHireTower } from "../buildings/hireTower/BuildingPopupViewModelHireTower";
import { BuildingViewHireTower } from "../buildings/hireTower/BuildingViewHireTower";
import { BuildingViewModelHireTower } from "../buildings/hireTower/BuildingViewModelHireTower";
import { IBuildingPopupViewModel } from "../buildings/IBuildingPopupViewModel";
import { IBuildingViewModel } from "../buildings/IBuildingViewModel";
import { AssetPack } from "../assetPack/AssetPack";
import { HeroesPopupViewModel } from "../player/HeroesPopupViewModel";
import { HeroesPopupView } from "../ui/HeroesPopupView";
import { PopupView } from "../ui/PopupView";

export class ViewFactory {

    constructor(
        private assetPack: AssetPack,
        private popupParent: Node,
        private viewsParent: Node,
    ) {}

    createBuildingPopupView(buildingPopupViewModel: IBuildingPopupViewModel): PopupView {
        let buildingId = buildingPopupViewModel.getId();
        const prefabs = this.assetPack.prefabsByBuildingId.get(buildingId);
        
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
                    view.init(this.assetPack, buildingPopupViewModel);
                    return view;
                }
                throw new Error("No valid buildingPopupViewModel for id=${buildingId}.");
            }
        }

        throw new Error("No building prefabs for id=${buildingId}.");
    }

    createBuildingView(buildingViewModel: IBuildingViewModel) {
        let buildingId = buildingViewModel.getId();
        const prefabs = this.assetPack.prefabsByBuildingId.get(buildingId);
        
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

    createHeroesPopupView(heroesPopupViewModel: HeroesPopupViewModel): PopupView {
        let view = instantiate(this.assetPack.heroesPopupViewPrefab).getComponent(HeroesPopupView)!;
        this.popupParent.addChild(view.node);
        view.init(this.assetPack, heroesPopupViewModel);
        return view;
    }

    private isBuildingPopupViewModelHireTower(viewModel: IBuildingPopupViewModel): viewModel is BuildingPopupViewModelHireTower {
        return viewModel instanceof BuildingPopupViewModelHireTower;
    }

    private isBuildingViewModelHireTower(viewModel: IBuildingViewModel): viewModel is BuildingViewModelHireTower {
        return viewModel instanceof BuildingViewModelHireTower;
    }
}