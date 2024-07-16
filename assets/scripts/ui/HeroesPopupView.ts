import { _decorator, Component, instantiate, Layout, Prefab, Size, UITransform } from 'cc';
import { HeroesPopupViewModel } from '../player/HeroesPopupViewModel';
import { AssetPack } from '../assetPack/AssetPack';
import { PopupView } from './PopupView';
import { HeroCell } from './HeroCell';
const { ccclass, property } = _decorator;

@ccclass('HeroesPopupView')
export class HeroesPopupView extends PopupView {

    @property(Layout)
    cellsParent!: Layout;

    @property(Prefab)
    heroCellPrefab!: Prefab;

    private _assetPack!: AssetPack;
    private contentHeight: number = 0;
    private heroCells!: HeroCell[];
    private _heroesPopupViewModel!: HeroesPopupViewModel;

    init(assetPack: AssetPack, heroesPopupViewModel: HeroesPopupViewModel) {
        this._assetPack = assetPack;
        this._heroesPopupViewModel = heroesPopupViewModel;
        this.heroCells = [];
        this.contentHeight = this.cellsParent.paddingBottom + this.cellsParent.paddingTop;
        this._heroesPopupViewModel.subject.subscribe(this.refresh.bind(this));
    }

    onDestroy(): void {
        this._heroesPopupViewModel.onDestroy();
    }

    refresh() {
        
        let heroModels = this._heroesPopupViewModel.getHeroModels();
        if (heroModels.length == 0)
        {
            return;
        }

        for (let i = this.heroCells.length; i < heroModels.length; i++)
        {
            let cell = instantiate(this.heroCellPrefab).getComponent(HeroCell)!;
            cell.init(this._assetPack, heroModels[i]);
            this.cellsParent.node.addChild(cell.node);
            this.heroCells.push(cell);
            this.contentHeight += cell.getComponent(UITransform)!.height;
            if (i > 0)
            {
                this.contentHeight += this.cellsParent.spacingY;
            }
        }

        var cellsParentTransform = this.cellsParent.getComponent(UITransform)!;
        let width = cellsParentTransform.width;
        cellsParentTransform.setContentSize(new Size(width, this.contentHeight))
    }
}


