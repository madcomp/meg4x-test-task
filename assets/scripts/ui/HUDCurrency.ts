import { _decorator, Component, Label } from 'cc';
import { CurrencyViewModel } from '../player/CurrencyViewModel';
const { ccclass, property } = _decorator;

@ccclass('HUDCurrency')
export class HUDCurrency extends Component {

    @property(Label)
    private labelCurrency!: Label;

    init(currencyViewModel: CurrencyViewModel) {
        currencyViewModel.subject.subscribe(this.refresh.bind(this));
    }

    private refresh(currencyViewModel: CurrencyViewModel) {
        this.labelCurrency.string = currencyViewModel.currency.toString();
    }
}


