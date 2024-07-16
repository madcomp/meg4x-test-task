import { _decorator, Component, Label, Sprite, SpriteFrame } from 'cc';
import { HeroInfo } from '../heroes/HeroInfo';
import { AssetPack } from '../assetPack/AssetPack';
import { Utils } from '../Utils';
const { ccclass, property } = _decorator;

@ccclass('HeroOption')
export class HeroOption extends Component {

    @property(Sprite)
    private spriteElementalType!: Sprite;

    @property(Sprite)
    private spriteHero!: Sprite;

    @property(Sprite)
    private spriteHeroRank!: Sprite;

    init(assetPack: AssetPack, heroInfo: HeroInfo) {
        this.spriteElementalType.spriteFrame = Utils.getValue(assetPack.spriteFrameByElementalTypeId, heroInfo.type);
        this.spriteHero.spriteFrame = Utils.getValue(assetPack.spriteFrameByHeroId, heroInfo.id);
        this.spriteHeroRank.spriteFrame = Utils.getValue(assetPack.spriteFrameByHeroRankId, heroInfo.rank);
    }
}


