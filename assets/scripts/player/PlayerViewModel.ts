import { BehaviorSubject } from "rxjs";
import { PlayerModel } from "./PlayerModel";

export class PlayerViewModel {
    
    private innerSubject: BehaviorSubject<PlayerViewModel>;
    private playerModel!: PlayerModel;

    constructor(parPlayerModel: PlayerModel) {
        this.innerSubject = new BehaviorSubject<PlayerViewModel>(this);
        this.playerModel = parPlayerModel;
        this.playerModel.currencyChanges.subscribe(this.notify.bind(this));
    }

    get currency(): number {
        return this.playerModel.currency;
    }

    public spendCurrency(amount: number) {
        this.playerModel.currency = Math.max(0, this.playerModel.currency - amount);
    }

    public get subject() {
        return this.innerSubject.asObservable();
    }

    notify() {
        this.innerSubject.next(this);
    }
}


