import { BehaviorSubject } from "rxjs";
import { PlayerModel } from "./PlayerModel";

export class CurrencyViewModel {
    
    private _subject: BehaviorSubject<CurrencyViewModel>;

    constructor(private playerModel: PlayerModel) {
        this._subject = new BehaviorSubject<CurrencyViewModel>(this);
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


