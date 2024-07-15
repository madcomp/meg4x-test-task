import { JsonAsset } from "cc";
import { BuildingInfoHireTower } from "../building/BuildingInfoHireTower";
import { BuildingInfos } from "../building/BuildingInfos";
import { PlayerState } from "../player/PlayerState";
import { BuildingIds } from "../Constants";

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
                    building.hireSlots
                );
            }
        }
        if (buildingInfoHireTower == null)
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


