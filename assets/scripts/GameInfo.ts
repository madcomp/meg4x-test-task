import { BuildingInfos } from "./buildings/BuildingInfos";
import { HeroInfo } from "./heroes/HeroInfo";

export class GameInfo {
    constructor(
        public buildingInfos: BuildingInfos,
        public heroInfoById: Map<string, HeroInfo>
    ) {}
}


