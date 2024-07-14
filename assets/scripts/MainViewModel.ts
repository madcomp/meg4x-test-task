import { _decorator, Component, JsonAsset, Input, input, EventKeyboard, KeyCode } from 'cc';
import { PlayerModel } from './player/PlayerModel';
import { PlayerViewModel } from './player/PlayerViewModel';
import { HUDCurrency } from './ui/HUDCurrency';
const { ccclass, property } = _decorator;

@ccclass('MainViewModel')
export class MainViewModel extends Component {

    @property(HUDCurrency)
    private hudCurrency!: HUDCurrency;

    @property(JsonAsset)
    private playerJson!: JsonAsset;

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
        const playerData = this.playerJson.json!;
        const playerCurrency = playerData.state?.currency ?? 0;
        this.playerModel = new PlayerModel(playerCurrency);

        this.playerViewModel = new PlayerViewModel(this.playerModel);
        this.hudCurrency.init(this.playerViewModel);
    }
}


