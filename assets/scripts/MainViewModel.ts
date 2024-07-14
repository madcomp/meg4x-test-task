import { _decorator, Component, Input, input, EventKeyboard, KeyCode } from 'cc';
import { PlayerModel } from './player/PlayerModel';
import { PlayerViewModel } from './player/PlayerViewModel';
import { HUDCurrency } from './ui/HUDCurrency';
import { DataLoader } from './data/DataLoader';
import { DataToLoad } from './data/DataToLoad';
const { ccclass, property } = _decorator;

@ccclass('MainViewModel')
export class MainViewModel extends Component {

    @property(DataToLoad)
    private dataToLoad!: DataToLoad;

    @property(HUDCurrency)
    private hudCurrency!: HUDCurrency;

    private playerModel! : PlayerModel;
    private playerViewModel! : PlayerViewModel;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    onKeyDown(event: EventKeyboard) {
        if (event.keyCode == KeyCode.KEY_Z) {
            this.playerViewModel.spendCurrency(10);
        }
    }

    start() {
        let dataLoader = new DataLoader();
        dataLoader.load(this.dataToLoad);
        this.playerModel = new PlayerModel(dataLoader.playerCurrency);

        this.playerViewModel = new PlayerViewModel(this.playerModel);
        this.hudCurrency.init(this.playerViewModel);
    }
}


