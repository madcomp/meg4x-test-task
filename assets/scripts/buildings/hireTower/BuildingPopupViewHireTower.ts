import { _decorator, Button, Color, EventMouse, instantiate, Label, Node, Prefab, Sprite, tween } from 'cc';
import { BuildingPopupView } from '../BuildingPopupView';
import { BuildingPopupViewModelHireTower } from './BuildingPopupViewModelHireTower';
import { HeroOption } from '../../ui/HeroOption';
import { LayoutHorizontalCentered } from '../../ui/LayoutHorizontalCentered';
import { HeroInfo } from '../../heroes/HeroInfo';
import { HireSlot } from '../../ui/HireSlot';
const { ccclass, property } = _decorator;

@ccclass('BuildingViewHireTower')
export class BuildingPopupViewHireTower extends BuildingPopupView<BuildingPopupViewModelHireTower> {

    @property(Button)
    private buttonHire!: Button;

    @property(LayoutHorizontalCentered)
    private heroOptionParent!: LayoutHorizontalCentered;

    @property(Prefab)
    private heroOptionPrefab!: Prefab;

    @property(Prefab)
    private hireSlotPrefab!: Prefab;

    @property(LayoutHorizontalCentered)
    private hireSlotParent!: LayoutHorizontalCentered;

    @property(Node)
    private overlay!: Node;

    @property(Node)
    private container!: Node;

    @property(Node)
    private heroPrice!: Node;

    @property(Label)
    private heroPriceLabel!: Label;

    @property(Label)
    private labelTitle!: Label;

    @property(Label)
    private labelDescription!: Label;

    @property(Node)
    private anchorFrom!: Node;

    @property(Node)
    private anchorTo!: Node;

    @property
    private animationDuration: number = 0.4;

    @property(Color)
    private colorHasCurrency: Color = new Color(0, 1, 0);
    
    @property(Color)
    private colorNoCurrency: Color = new Color(1, 0, 0);

    private currentHeroInfo: HeroInfo | null = null;
    private heroOptionByHeroInfo!: Map<HeroInfo, HeroOption>;
    private hireSlots!: HireSlot[];

    onDestroy(): void {
        this.viewModel.onDestroy();
    }

    onHireHeroButtonPressed() {
        if (!!this.currentHeroInfo)
        {
            this.viewModel.startHiring(this.currentHeroInfo);
        }
    }

    update(deltaTime: number) {
        this.refreshHireSlots();
    }

    protected onInit(): void {
        
        this.container.on(Node.EventType.MOUSE_DOWN, this.onClickContainer, this);
        this.overlay.on(Node.EventType.MOUSE_DOWN, this.onClickOverlay, this);

        this.labelTitle.string = this.viewModel.getTitle();
        this.labelDescription.string = this.viewModel.getDescription();

        this.container.position = this.anchorFrom.position;
        tween(this.container)
            .to(this.animationDuration, { position: this.anchorTo.position }, { easing: "quadOut" })
            .start();

        this.buildHireSlots();
        this.buildHeroOptions();

        this.viewModel.subject().subscribe(this.refresh.bind(this));
    }

    private buildHireSlots() {
        this.hireSlots = [];
        for (let i = 0; i < this.viewModel.getHireSlots(); i++)
        {
            var hireSlot = instantiate(this.hireSlotPrefab).getComponent(HireSlot)!;
            this.hireSlotParent.node.addChild(hireSlot.node);
            hireSlot.init(this.assetPack);
            this.hireSlots.push(hireSlot);
        }
        this.hireSlotParent.refresh();
    }

    private buildHeroOptions() {
        this.heroOptionByHeroInfo = new Map<HeroInfo, HeroOption>();
        var heroInfos = this.viewModel.getHeroInfos();
        for (var heroInfo of heroInfos)
        {
            var heroOption = instantiate(this.heroOptionPrefab).getComponent(HeroOption)!;
            this.heroOptionParent.node.addChild(heroOption.node)
            heroOption.init(this.assetPack, heroInfo);
            heroOption.node.on(Node.EventType.MOUSE_DOWN, this.onClickHeroOption, this);
            this.heroOptionByHeroInfo.set(heroInfo, heroOption);
        }
        this.heroOptionParent.refresh();
    }

    private isButtonHireEnabled()
    {
        if (!this.currentHeroInfo)
        {
            return false;
        }

        var canPay = this.viewModel.getPlayerModel().canPay(this.currentHeroInfo.cost);
        if (!canPay)
        {
            return false;
        }

        return this.viewModel.hasFreeHireSlots();
    }

    private onClickContainer(eventMouse: EventMouse) {
        eventMouse.propagationStopped = true;
    }

    private onClickHeroOption(eventMouse: EventMouse) {
        eventMouse.propagationStopped = true;

        const heroOption = eventMouse.currentTarget?.getComponent(HeroOption);
        if (heroOption && heroOption.heroInfo && heroOption.heroInfo != this.currentHeroInfo)
        {
            this.currentHeroInfo = heroOption.heroInfo;
            this.refresh();
        }
    }

    private onClickOverlay(eventMouse: EventMouse) {
        eventMouse.propagationStopped = false;
        this.close();
    }

    private refresh() {

        if (!this.currentHeroInfo)
        {
            this.heroPrice.active = false;
            return;
        }

        this.heroPrice.active = true;
        this.heroPriceLabel.string = this.currentHeroInfo.cost.toString();
        
        var canPay = this.viewModel.getPlayerModel().canPay(this.currentHeroInfo.cost);
        var priceColor = canPay ? this.colorHasCurrency : this.colorNoCurrency;
        this.heroPriceLabel.color = priceColor;

        for (let [key, value] of this.heroOptionByHeroInfo)
        {
            if (key == this.currentHeroInfo)
            {
                value.highlight(priceColor);
            }
            else
            {
                value.unhighlight();
            }
        }

        this.refreshButtonHire();
        this.refreshHireSlots();
    }

    private refreshButtonHire() {
        if (this.isButtonHireEnabled())
        {
            this.buttonHire.interactable = true;
            this.buttonHire.getComponent(Sprite)!.color = new Color(255, 255, 255, 255);
        }
        else
        {
            this.buttonHire.interactable = false;
            this.buttonHire.getComponent(Sprite)!.color = new Color(255, 255, 255, 128);
        }
    }

    private refreshHireSlots() {

        if (this.viewModel.isHiringHeroes())
        {
            var heroInfo = this.viewModel.getHeroBeingHired(0);
            this.hireSlots[0].setTimeToHire(this.viewModel.dateStartedHiring, heroInfo!.summonCooldown);
        }
        for (let i = 0; i < this.hireSlots.length; i++)
        {
            this.hireSlots[i].setHeroInfo(this.viewModel.getHeroBeingHired(i));
        }
    }
}


