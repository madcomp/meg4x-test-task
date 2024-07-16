import { BehaviorSubject } from "rxjs";
import { PlayerModel } from "./PlayerModel";

export class HeroesPopupViewModel {
    
    private _subject: BehaviorSubject<HeroesPopupViewModel>;

    constructor(private playerModel: PlayerModel) {
        this._subject = new BehaviorSubject<HeroesPopupViewModel>(this);
        this.playerModel.hiredHeroesChanges.subscribe(this.notify.bind(this));
    }

    get subject() {
        return this._subject.asObservable();
    }

    private notify() {
        this._subject.next(this);
    }
}


