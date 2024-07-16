import { BuildingModelHireTower } from "./BuildingModelHireTower";
import { BuildingPopupViewModel } from "../BuildingPopupViewModel";
import { HeroInfo } from "../../heroes/HeroInfo";
import { PlayerModel } from "../../player/PlayerModel";

export class BuildingPopupViewModelHireTower extends BuildingPopupViewModel<BuildingModelHireTower> {

    get dateStartedHiring() {
        return this.model.dateStartedHiring;
    }

    getHeroBeingHired(index: number) {
        return this.model.getHeroBeingHired(index);
    }

    getHeroInfos(): HeroInfo[] {
        return Array.from(this.gameInfo.heroInfoById.values());
    }

    getHireSlots(): number {
        return this.model.info.hireSlots;
    }

    isHiringHeroes(): boolean {
        return this.model.isHiringHeroes();
    }

    startHiring(heroInfo: HeroInfo) {
        if (!this.playerModel.canPay(heroInfo.cost))
        {
            return;
        }
        this.playerModel.pay(heroInfo.cost);
        this.model.startHiring(heroInfo);
    }
}


