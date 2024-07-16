import { BuildingIds } from "../Constants";
import { BuildingInfos } from "../buildings/BuildingInfos";
import { BuildingInfoHireTower } from "../buildings/hireTower/BuildingInfoHireTower";
import { JsonAsset } from "cc";
import { PlayerState } from "../player/PlayerState";
import { Utils } from "../Utils";
import { HeroInfo } from "../heroes/HeroInfo";

export class DataLoader {

    static loadBuildingInfos(buildingsJson: JsonAsset): BuildingInfos {
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
                    building.settings.hireSlots
                );
            }
        }
        if (!buildingInfoHireTower)
        {
            throw new Error("No data for ${BuildingIds.HireTower} building in json file.");
        }
        return new BuildingInfos(buildingInfoHireTower);
    }

    static loadHeroInfoById(heroesJson: JsonAsset): Map<string, HeroInfo> {
        const heroesData = heroesJson.json!;
        const heroes = heroesData.heroes;
        let heroInfos = new Map<string, HeroInfo>();
        for (var hero of heroes)
        {
            let heroInfo = new HeroInfo(
                hero.id,
                hero.name,
                hero.description,
                hero.cost,
                hero.summonCooldown,
                hero.type,
                hero.rank
            );
            heroInfos.set(hero.id, heroInfo);
        }
        return heroInfos;
    }

    static loadPlayerState(playerStateJson: JsonAsset): PlayerState {
        const playerStateData = playerStateJson.json!;
        return new PlayerState(
            playerStateData.state?.currency ?? 0,
            playerStateData.state?.buildings ?? [],
            playerStateData.state?.heroes ?? []
        );
    }
}


