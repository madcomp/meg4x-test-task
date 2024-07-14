import { BehaviorSubject } from 'rxjs';

export class PlayerModel {
    
    private currencySubject: BehaviorSubject<number>;

    constructor(currency: number) {
        this.currencySubject = new BehaviorSubject<number>(currency);
    }

    get currency(): number {
        return this.currencySubject.value;
    }

    set currency(value: number) {
        if (value >= 0)
        {
            this.currencySubject.next(value);
        }
    }

    get currencyChanges() {
        return this.currencySubject.asObservable();
    }
}


