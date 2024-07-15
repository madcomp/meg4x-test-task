import { BehaviorSubject } from 'rxjs';
import { Factory } from '../Factory';
import { PlayerState } from './PlayerState';
import { IBuildingModel } from '../building/IBuildingModel';

export class PlayerModel {
    
    private currencySubject: BehaviorSubject<number>;
    readonly buildingModels: IBuildingModel[];

    constructor(playerState: PlayerState, factory: Factory) {
        this.currencySubject = new BehaviorSubject<number>(playerState.currency);
        this.buildingModels = [];
        for (var buildingId of playerState.buildingIds)
        {
            let buildingModel = factory.createBuildingModel(buildingId);
            if (buildingModel != null)
            {
                this.buildingModels.push(buildingModel);
            }
        }
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
}


