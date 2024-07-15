import { BehaviorSubject } from "rxjs";
import { PlayerModel } from "./PlayerModel";

export class PlayerViewModel {
    
    private _subject: BehaviorSubject<PlayerViewModel>;

    constructor(private playerModel: PlayerModel) {
        this._subject = new BehaviorSubject<PlayerViewModel>(this);
        this.playerModel.currencyChanges.subscribe(this.notify.bind(this));
    }

    get currency(): number {
        return this.playerModel.currency;
    }

    spendCurrency(amount: number) {
        this.playerModel.currency = Math.max(0, this.playerModel.currency - amount);
    }

    get subject() {
        return this._subject.asObservable();
    }

    private notify() {
        this._subject.next(this);
    }
}


