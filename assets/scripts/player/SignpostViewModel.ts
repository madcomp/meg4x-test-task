import { BehaviorSubject } from "rxjs";
import { PlayerModel } from "./PlayerModel";
import { UIManager } from "../ui/UIManager";

export class SignpostViewModel {
    
    private _newHeroesCount = 0;
    private _subject: BehaviorSubject<SignpostViewModel>;

    constructor(private uiManager: UIManager, private playerModel: PlayerModel) {
        this._subject = new BehaviorSubject<SignpostViewModel>(this);
        this.playerModel.hiredHeroesChanges.subscribe(this.onNewHeroAdded.bind(this));
        this._newHeroesCount = 0;
    }

    get newHeroesCount(): number {
        return this._newHeroesCount;
    }

    private onNewHeroAdded() {
        if (this.uiManager.isHeroesPopupViewVisible())
        {
            return;
        }
        this._newHeroesCount++;
        this.notify();
    }

    resetNewHeroesCount() {
        this._newHeroesCount = 0;
        this.notify();
    }

    get subject() {
        return this._subject.asObservable();
    }

    private notify() {
        this._subject.next(this);
    }
}


