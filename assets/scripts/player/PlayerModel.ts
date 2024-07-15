import { BehaviorSubject } from 'rxjs';
import { IBuildingModel } from '../building/IBuildingModel';
import { ModelViewModelFactory } from '../factory/ModelViewModelFactory';
import { PlayerState } from './PlayerState';

export class PlayerModel {
    
    private currencySubject: BehaviorSubject<number>;
    readonly buildingModels: IBuildingModel[];

    constructor(playerState: PlayerState, modelViewModelFactory: ModelViewModelFactory) {
        this.currencySubject = new BehaviorSubject<number>(playerState.currency);
        this.buildingModels = [];
        for (var buildingId of playerState.buildingIds)
        {
            let buildingModel = modelViewModelFactory.createBuildingModel(buildingId);
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


