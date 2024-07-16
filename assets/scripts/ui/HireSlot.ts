import { _decorator, Component, Sprite, Vec3 } from 'cc';
import { HeroInfo } from '../heroes/HeroInfo';
import { AssetPack } from '../assetPack/AssetPack';
import { Utils } from '../Utils';
const { ccclass, property } = _decorator;

@ccclass('HireSlot')
export class HireSlot extends Component {

    @property(Sprite)
    private spriteElementalType!: Sprite;

    @property(Sprite)
    private spriteHero!: Sprite;

    @property(Sprite)
    private spriteHeroRank!: Sprite;

    @property(Sprite)
    private progressBar!: Sprite;

    private _assetPack!: AssetPack;
    private _heroInfo: HeroInfo | null = null;

    init(assetPack: AssetPack) {
        this._assetPack = assetPack;
        this.spriteElementalType.node.active = false;
        this.spriteHero.node.active = false;
        this.spriteHeroRank.node.active = false;
        this.progressBar.node.active = false;
    }

    setHeroInfo(heroInfo: HeroInfo | null) {
        if (this._heroInfo == heroInfo)
        {
            return;
        }
        this._heroInfo = heroInfo;
        if (!!this._heroInfo)
        {
            this.spriteElementalType.node.active = true;
            this.spriteElementalType.spriteFrame = Utils.getValue(this._assetPack.spriteFrameByElementalTypeId, this._heroInfo.type);
            this.spriteHero.node.active = true;
            this.spriteHero.spriteFrame = Utils.getValue(this._assetPack.spriteFrameByHeroId, this._heroInfo.id);
            this.spriteHeroRank.node.active = true;
            this.spriteHeroRank.spriteFrame = Utils.getValue(this._assetPack.spriteFrameByHeroRankId, this._heroInfo.rank);
        }
        else
        {
            this.spriteElementalType.node.active = false;
            this.spriteHero.node.active = false;
            this.spriteHeroRank.node.active = false;
            this.progressBar.node.active = false;
        }
    }

    setTimeToHire(timeStart: Date, cooldown: number) {
        var timeElapsed = (new Date().getTime() - timeStart.getTime()) / 1000;
        var ratio = cooldown > 0 ? Utils.clamp(timeElapsed / cooldown, 0, 1) : 1;
        this.progressBar.node.active = true;
        this.progressBar.node.scale = new Vec3(ratio, 1, 1);
    }
}


