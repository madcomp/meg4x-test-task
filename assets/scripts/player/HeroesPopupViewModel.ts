import { BehaviorSubject, Subscription } from "rxjs";
import { PlayerModel } from "./PlayerModel";

export class HeroesPopupViewModel {
    
    private _subject: BehaviorSubject<HeroesPopupViewModel>;
    private subscription: Subscription;

    constructor(private playerModel: PlayerModel) {
        this._subject = new BehaviorSubject<HeroesPopupViewModel>(this);
        this.subscription = this.playerModel.hiredHeroesChanges.subscribe(this.notify.bind(this));
    }

    getHeroModels() {
        return this.playerModel.heroModels;
    }

    get subject() {
        return this._subject.asObservable();
    }

    onDestroy() {
        this.subscription.unsubscribe();
    }

    private notify() {
        this._subject.next(this);
    }
}


