import { BehaviorSubject, Observable } from "rxjs";
import { UIManager } from "../../ui/UIManager";
import { BuildingViewModel } from "../BuildingViewModel";
import { BuildingModelHireTower } from "./BuildingModelHireTower";

export class BuildingViewModelHireTower extends BuildingViewModel<BuildingModelHireTower> {
    
    private _subject!: BehaviorSubject<BuildingViewModelHireTower>;

    constructor(
        protected uiManager: UIManager,
        protected readonly model: BuildingModelHireTower) {

        super(uiManager, model);
        this._subject = new BehaviorSubject<BuildingViewModelHireTower>(this);
        model.hiringChanges().subscribe(this.notify.bind(this));
    }

    hiringChanges(): Observable<BuildingViewModelHireTower> {
        return this._subject.asObservable();
    }

    isHiringHeroes(): boolean {
        return this.model.isHiringHeroes();
    }

    notify(): void {
        this._subject.next(this);
    }

    select(): void {
        this.uiManager.showBuildingPopupViewHireTower(this.model);
    }
}


