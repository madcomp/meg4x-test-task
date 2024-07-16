import { BuildingInfoHireTower } from './BuildingInfoHireTower';
import { BuildingModel } from '../BuildingModel';
import { HeroInfo } from '../../heroes/HeroInfo';
import { PlayerModel } from '../../player/PlayerModel';

export class BuildingModelHireTower extends BuildingModel<BuildingInfoHireTower> {

    private heroesBeingHired: HeroInfo[] = [];
    private _dateStartedHiring!: Date;

    get dateStartedHiring(): Date {
        return this._dateStartedHiring;
    }

    getHeroBeingHired(index: number): HeroInfo | null {
        if (index < this.heroesBeingHired.length)
        {
            return this.heroesBeingHired[index];
        }
        return null;
    }

    hasFreeHireSlots(): boolean {
        return this.heroesBeingHired.length < this.info.hireSlots;
    }

    isHiringHeroes(): boolean {
        return this.heroesBeingHired.length > 0;
    }

    startHiring(heroInfo: HeroInfo): void {
        
        if (this.heroesBeingHired.length >= this.info.hireSlots)
        {
            return;
        }

        if (this.heroesBeingHired.length == 0)
        {
            this._dateStartedHiring = new Date();
        }
        this.heroesBeingHired.push(heroInfo);
    }

    update(deltaTime: number, playerModel: PlayerModel) {
        if (this.isHiringHeroes())
        {
            var now = new Date();
            var timeElapsed = (now.getTime() - this._dateStartedHiring.getTime()) / 1000;
            var remainingTime = this.heroesBeingHired[0].summonCooldown - timeElapsed;
            if (remainingTime < 0)
            {
                var heroToHire = this.heroesBeingHired.shift();
                this._dateStartedHiring = new Date(Date.now() + remainingTime);
                playerModel.hire(heroToHire!);
            }
        }
    }
}