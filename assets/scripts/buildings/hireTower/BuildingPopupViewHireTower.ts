import { _decorator, instantiate, Node, Prefab, tween } from 'cc';
import { BuildingPopupView } from '../BuildingPopupView';
import { BuildingPopupViewModelHireTower } from './BuildingPopupViewModelHireTower';
import { HeroOption } from '../../ui/HeroOption';
import { LayoutHorizontalCentered } from '../../ui/LayoutHorizontalCentered';
const { ccclass, property } = _decorator;

@ccclass('BuildingViewHireTower')
export class BuildingPopupViewHireTower extends BuildingPopupView<BuildingPopupViewModelHireTower> {

    @property(LayoutHorizontalCentered)
    private heroOptionParent!: LayoutHorizontalCentered;

    @property(Prefab)
    private heroOptionPrefab!: Prefab;

    @property(Prefab)
    private hireSlotPrefab!: Prefab;

    @property(Node)
    private anchorFrom!: Node;

    @property(Node)
    private anchorTo!: Node;

    @property
    private animationDuration: number = 0.4;

    @property(Node)
    private container!: Node;
    
    protected onInit(): void {
        
        this.container.position = this.anchorFrom.position;
        tween(this.container)
            .to(this.animationDuration, { position: this.anchorTo.position }, { easing: "quadOut" })
            .start();

        var heroInfos = this.viewModel.getHeroInfos();
        for (var heroInfo of heroInfos)
        {
            var heroOption = instantiate(this.heroOptionPrefab).getComponent(HeroOption)!;
            this.heroOptionParent.node.addChild(heroOption.node)
            heroOption.init(this.assetPack, heroInfo);
        }
        this.heroOptionParent.refresh();
    }
}


