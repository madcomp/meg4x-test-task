import { BuildingIds } from "../Constants";
import { BuildingInfos } from "../building/BuildingInfos";
import { BuildingInfoHireTower } from "../building/hireTower/BuildingInfoHireTower";
import { JsonAsset } from "cc";
import { PlayerState } from "../player/PlayerState";
import { Utils } from "../Utils";

export class DataLoader {

    static loadBuildingInfos(buildingsJson: JsonAsset) {
        const buildingsData = buildingsJson.json!;
        const buildings = buildingsData.buildings;
        let buildingInfoHireTower: BuildingInfoHireTower | null = null;
        for (var building of buildings)
        {
            if (building.id == BuildingIds.HireTower)
            {
                buildingInfoHireTower = new BuildingInfoHireTower(
                    building.id,
                    building.name,
                    building.description,
                    building.cost,
                    Utils.objectToVec3(building.position),
                    building.hireSlots
                );
            }
        }
        if (!buildingInfoHireTower)
        {
            throw new Error("No data for ${BuildingIds.HireTower} building in json file.");
        }
        return new BuildingInfos(buildingInfoHireTower);
    }

    static loadPlayerState(playerStateJson: JsonAsset) {
        const playerStateData = playerStateJson.json!;
        return new PlayerState(
            playerStateData.state?.currency ?? 0,
            playerStateData.state?.buildings ?? []
        );
    }
}


