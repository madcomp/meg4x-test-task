import { BehaviorSubject } from 'rxjs';
import { BuildingInfos } from '../building/BuildingInfos';
import { BuildingInfo } from '../building/BuildingInfo';
import { BuildingModel } from '../building/BuildingModel';
import { PlayerState } from './PlayerState';
import { BuildingModelHireTower } from '../building/BuildingModelHireTower';
import { ModelFactory } from '../factories/ModelFactory';

export class PlayerModel {
    
    private currencySubject: BehaviorSubject<number>;
    readonly buildingModels: BuildingModel<BuildingInfo>[];

    constructor(playerState: PlayerState, modelFactory: ModelFactory) {
        this.currencySubject = new BehaviorSubject<number>(playerState.currency);
        this.buildingModels = [];
        for (var buildingId of playerState.buildingIds)
        {
            let buildingModel = modelFactory.createBuildingModel(buildingId);
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


