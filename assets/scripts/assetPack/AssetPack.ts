import { Prefab, SpriteFrame } from "cc";
import { BuildingPrefabs } from "./BuildingPrefabs";
import { IdSpriteFrame } from "./IdSpriteFrame";

export class AssetPack {

    public readonly prefabsByBuildingId: Map<string, BuildingPrefabs>;
    public readonly spriteFrameByHeroId: Map<string, SpriteFrame>;
    public readonly spriteFrameByHeroRankId: Map<string, SpriteFrame>;
    public readonly spriteFrameByElementalTypeId: Map<string, SpriteFrame>;

    constructor(
        buildingsPrefabs: BuildingPrefabs[],
        public readonly heroesPopupViewPrefab: Prefab,
        heroSpriteFrames: IdSpriteFrame[],
        heroRankSpriteFrames: IdSpriteFrame[],
        elementalTypeSpriteFrames: IdSpriteFrame[]
    ) {
        this.prefabsByBuildingId = new Map();
        for (var buildingPrefabs of buildingsPrefabs)
        {
            this.prefabsByBuildingId.set(buildingPrefabs.buildingId, buildingPrefabs);
        }

        this.spriteFrameByHeroId = this.getSpriteFrameById(heroSpriteFrames);
        this.spriteFrameByHeroRankId = this.getSpriteFrameById(heroRankSpriteFrames);
        this.spriteFrameByElementalTypeId = this.getSpriteFrameById(elementalTypeSpriteFrames);
    }

    private getSpriteFrameById(idSpriteFrames: IdSpriteFrame[]): Map<string, SpriteFrame> {
        let spriteFrameById = new Map<string, SpriteFrame>();
        for (let idSpriteFrame of idSpriteFrames)
        {
            spriteFrameById.set(idSpriteFrame.id, idSpriteFrame.spriteFrame);
        }
        return spriteFrameById;
    }
}


