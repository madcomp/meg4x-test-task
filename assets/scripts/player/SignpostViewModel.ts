import { BehaviorSubject } from "rxjs";
import { PlayerModel } from "./PlayerModel";

export class SignpostViewModel {
    
    private _newHeroesCount = 0;
    private _subject: BehaviorSubject<SignpostViewModel>;

    constructor(private playerModel: PlayerModel) {
        this._subject = new BehaviorSubject<SignpostViewModel>(this);
        this.playerModel.hiredHeroesChanges.subscribe(this.onNewHeroAdded.bind(this));
        this._newHeroesCount = 0;
    }

    get newHeroesCount(): number {
        return this._newHeroesCount;
    }

    private onNewHeroAdded() {
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


