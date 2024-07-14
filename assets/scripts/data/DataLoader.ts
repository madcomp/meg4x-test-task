import { JsonAsset } from "cc";
import { BuildingHireTowerInfo } from "../building/BuildingHireTowerInfo";
import { DataToLoad } from "./DataToLoad";

export class DataLoader {

    private _buildingHireTowerInfo!: BuildingHireTowerInfo;
    private _playerCurrency: number = 0;

    get buildingHireTowerInfo() : BuildingHireTowerInfo {
        return this._buildingHireTowerInfo;
    }

    load(dataToLoad: DataToLoad) {
        this.loadPlayer(dataToLoad.initialState);
        this.loadBuildings(dataToLoad.buildings);
    }

    get playerCurrency() : number {
        return this._playerCurrency;
    }

    private loadBuildings(buildingsJson: JsonAsset) {
        const buildingsData = buildingsJson.json!;
        const buildings = buildingsData.buildings;
        for (var building of buildings)
        {
            if (building.id == "hire_tower")
            {
                this._buildingHireTowerInfo = new BuildingHireTowerInfo(
                    building.id,
                    building.name,
                    building.description,
                    building.cost,
                    building.hireSlots
                );
            }
        }
    }

    private loadPlayer(playerJson: JsonAsset) {
        const playerData = playerJson.json!;
        this._playerCurrency = playerData.state?.currency ?? 0;
    }
}


