import { _decorator, Component, Label, Sprite, Vec3 } from 'cc';
import { AssetPack } from '../assetPack/AssetPack';
import { Utils } from '../Utils';
import { HeroModel } from '../heroes/HeroModel';
const { ccclass, property } = _decorator;

@ccclass('HeroCell')
export class HeroCell extends Component {

    @property(Sprite)
    private spriteElementalType!: Sprite;

    @property(Sprite)
    private spriteHero!: Sprite;

    @property(Sprite)
    private spriteHeroRank!: Sprite;

    @property(Label)
    private labelName!: Label;

    @property(Label)
    private labelDescription!: Label;

    @property(Label)
    private labelRank!: Label;

    @property(Label)
    private labelCost!: Label;

    @property(Label)
    private labelType!: Label;

    @property(Label)
    private labelSummonTime!: Label;

    init(assetPack: AssetPack, heroModel: HeroModel) {
        this.spriteElementalType.spriteFrame = Utils.getValue(assetPack.spriteFrameByElementalTypeId, heroModel.info.type);
        this.spriteHero.spriteFrame = Utils.getValue(assetPack.spriteFrameByHeroId, heroModel.info.id);
        this.spriteHeroRank.spriteFrame = Utils.getValue(assetPack.spriteFrameByHeroRankId, heroModel.info.rank);
        this.labelName.string = heroModel.info.name;
        this.labelDescription.string = heroModel.info.description;
        this.labelRank.string = `Rank: ${heroModel.info.rank.toUpperCase()}`;
        this.labelCost.string = `Cost: ${heroModel.info.cost}`;
        this.labelType.string = `Type: ${Utils.capitalizeFirstLetter(heroModel.info.type)}`;
        this.labelSummonTime.string = `Summon Time: ${heroModel.info.summonCooldown}s`;
    }
}


