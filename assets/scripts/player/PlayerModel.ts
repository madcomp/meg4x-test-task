import { BehaviorSubject } from 'rxjs';
import { IBuildingModel } from '../buildings/IBuildingModel';
import { ModelViewModelFactory } from '../factory/ModelViewModelFactory';
import { PlayerState } from './PlayerState';
import { HeroInfo } from '../heroes/HeroInfo';
import { HeroModel } from '../heroes/HeroModel';

export class PlayerModel {
    
    private currencySubject: BehaviorSubject<number>;
    private hiredHeroesSubject: BehaviorSubject<number>;
    readonly buildingModels: IBuildingModel[];
    readonly heroModels: HeroModel[];

    constructor(playerState: PlayerState, private modelViewModelFactory: ModelViewModelFactory) {
        this.currencySubject = new BehaviorSubject<number>(playerState.currency);
        this.hiredHeroesSubject = new BehaviorSubject<number>(playerState.heroIds.length);
        this.buildingModels = [];
        for (var buildingId of playerState.buildingIds)
        {
            let buildingModel = modelViewModelFactory.createBuildingModel(buildingId);
            if (buildingModel != null)
            {
                this.buildingModels.push(buildingModel);
            }
        }
        this.heroModels = [];
        for (var heroId of playerState.heroIds)
        {
            let heroModel = modelViewModelFactory.createHeroModel(heroId);
            if (heroModel != null)
            {
                this.heroModels.push(heroModel);
            }
        }
    }

    canPay(value: number) {
        return value <= this.currency;
    }

    pay(value: number) {
        this.currency = Math.max(0, this.currency - value);
    }

    get currency(): number {
        return this.currencySubject.value;
    }

    set currency(value: number) {
        if (value >= 0)
        {
            this.currencySubject.next(value);
        }
    }

    get currencyChanges() {
        return this.currencySubject.asObservable();
    }

    hire(heroInfo: HeroInfo) {
        let heroModel = this.modelViewModelFactory.createHeroModel(heroInfo.id);
        if (heroModel != null)
        {
            this.heroModels.push(heroModel);
            this.hiredHeroesSubject.next(this.heroModels.length);
        }
    }

    get hiredHeroesChanges() {
        return this.hiredHeroesSubject.asObservable();
    }

    update(deltaTime: number) {
        for (let buildingModel of this.buildingModels)
        {
            buildingModel.update(deltaTime, this);
        }
    }
}


