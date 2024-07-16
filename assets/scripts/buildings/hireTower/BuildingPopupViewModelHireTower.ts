import { BuildingModelHireTower } from "./BuildingModelHireTower";
import { BuildingPopupViewModel } from "../BuildingPopupViewModel";
import { HeroInfo } from "../../heroes/HeroInfo";
import { PlayerModel } from "../../player/PlayerModel";
import { BehaviorSubject, Subscription } from "rxjs";
import { GameInfo } from "../../GameInfo";
import { UIManager } from "../../ui/UIManager";

export class BuildingPopupViewModelHireTower extends BuildingPopupViewModel<BuildingModelHireTower> {
    
    private _subject!: BehaviorSubject<BuildingPopupViewModelHireTower>;
    private _subscription!: Subscription;

    constructor(
        protected readonly gameInfo: GameInfo,
        protected readonly playerModel: PlayerModel,
        protected readonly uiManager: UIManager,
        protected readonly model: BuildingModelHireTower) {

        super(gameInfo, playerModel, uiManager, model);
        this._subject = new BehaviorSubject<BuildingPopupViewModelHireTower>(this);
        this._subscription = model.hiringChanges().subscribe(this.notify.bind(this));
    }

    getDescription(): string {
        return this.model.info.description;
    }

    get dateStartedHiring() {
        return this.model.dateStartedHiring;
    }

    getHeroBeingHired(index: number) {
        return this.model.getHeroBeingHired(index);
    }

    getHeroInfos(): HeroInfo[] {
        return Array.from(this.gameInfo.heroInfoById.values());
    }

    getHireSlots(): number {
        return this.model.info.hireSlots;
    }

    getTitle(): string {
        return this.model.info.name;
    }

    hasFreeHireSlots(): boolean {
        return this.model.hasFreeHireSlots();
    }

    isHiringHeroes(): boolean {
        return this.model.isHiringHeroes();
    }

    onDestroy() {
        this._subscription.unsubscribe();
    }

    startHiring(heroInfo: HeroInfo) {
        if (!this.playerModel.canPay(heroInfo.cost))
        {
            return;
        }
        this.playerModel.pay(heroInfo.cost);
        this.model.startHiring(heroInfo);
    }

    subject() {
        return this._subject.asObservable();
    }

    private notify() {
        this._subject.next(this);
    }
}


