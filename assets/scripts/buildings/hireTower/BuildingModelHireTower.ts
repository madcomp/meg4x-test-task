import { BuildingInfoHireTower } from './BuildingInfoHireTower';
import { BuildingModel } from '../BuildingModel';
import { HeroInfo } from '../../heroes/HeroInfo';
import { PlayerModel } from '../../player/PlayerModel';
import { BehaviorSubject, Observable } from 'rxjs';

export class BuildingModelHireTower extends BuildingModel<BuildingInfoHireTower> {

    private heroesBeingHired: HeroInfo[] = [];
    private _dateStartedHiring!: Date;
    private _hiring!: BehaviorSubject<BuildingModelHireTower>;

    constructor(public info: BuildingInfoHireTower) {
       super(info);
       this._hiring = new BehaviorSubject<BuildingModelHireTower>(this);
    }

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

    hiringChanges(): Observable<BuildingModelHireTower> {
        return this._hiring.asObservable();
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
        this._hiring.next(this);
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
                this._hiring.next(this);
            }
        }
    }
}