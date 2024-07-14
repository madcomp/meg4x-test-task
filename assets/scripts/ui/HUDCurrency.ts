import { _decorator, Component, Label } from 'cc';
import { PlayerViewModel } from '../player/PlayerViewModel';
const { ccclass, property } = _decorator;

@ccclass('HUDCurrency')
export class HUDCurrency extends Component {

    @property(Label)
    private labelCurrency!: Label;

    private playerViewModel!: PlayerViewModel;

    init(playerViewModel: PlayerViewModel) {
        playerViewModel.subject.subscribe(this.refresh.bind(this));
    }

    refresh(playerViewModel: PlayerViewModel) {
        this.labelCurrency.string = playerViewModel.currency.toString();
    }
}


