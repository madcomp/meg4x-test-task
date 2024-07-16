import { BuildingModelHireTower } from "./BuildingModelHireTower";
import { BuildingPopupViewModel } from "../BuildingPopupViewModel";
import { HeroInfo } from "../../heroes/HeroInfo";

export class BuildingPopupViewModelHireTower extends BuildingPopupViewModel<BuildingModelHireTower> {

    getHeroInfos(): HeroInfo[] {
        return Array.from(this.gameInfo.heroInfoById.values());
    }
}


