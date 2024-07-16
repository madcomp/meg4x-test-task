import { _decorator, Color, Component, Sprite } from 'cc';
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

    @property(Sprite)
    private spriteHighlight!: Sprite;

    private _heroInfo!: HeroInfo;

    public get heroInfo(): HeroInfo {
        return this._heroInfo;
    }

    init(assetPack: AssetPack, heroInfo: HeroInfo) {
        this._heroInfo = heroInfo;
        this.spriteElementalType.spriteFrame = Utils.getValue(assetPack.spriteFrameByElementalTypeId, heroInfo.type);
        this.spriteHero.spriteFrame = Utils.getValue(assetPack.spriteFrameByHeroId, heroInfo.id);
        this.spriteHeroRank.spriteFrame = Utils.getValue(assetPack.spriteFrameByHeroRankId, heroInfo.rank);
        this.spriteHighlight.node.active = false;
    }

    highlight(color: Color) {
        this.spriteHighlight.color = color;
        this.spriteHighlight.node.active = true;
    }

    unhighlight() {
        this.spriteHighlight.node.active = false;
    }
}


