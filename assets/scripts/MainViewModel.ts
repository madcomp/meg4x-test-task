import { _decorator, Component, Input, input, EventKeyboard, KeyCode, Node } from 'cc';
import { BuildingPrefabs } from './building/BuildingPrefabs';
import { DataLoader } from './data/DataLoader';
import { DataToLoad } from './data/DataToLoad';import { Factory } from './Factory';
import { HUDCurrency } from './ui/HUDCurrency';
import { PlayerModel } from './player/PlayerModel';
import { PlayerViewModel } from './player/PlayerViewModel';
const { ccclass, property } = _decorator;

@ccclass('MainViewModel')
export class MainViewModel extends Component {

    @property(DataToLoad)
    private dataToLoad!: DataToLoad;

    @property([BuildingPrefabs])
    private buildingsPrefabs: BuildingPrefabs[] = [];

    @property(HUDCurrency)
    private hudCurrency!: HUDCurrency;

    @property(Node)
    private viewsParent!: Node;

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
        let playerState = DataLoader.loadPlayerState(this.dataToLoad.initialState);
        let buildingInfos = DataLoader.loadBuildingInfos(this.dataToLoad.buildings);

        let factory = new Factory(buildingInfos, this.buildingsPrefabs, this.viewsParent);

        this.playerModel = new PlayerModel(playerState, factory);
        this.playerViewModel = new PlayerViewModel(this.playerModel);
        this.hudCurrency.init(this.playerViewModel);

        for (var buildingModel of this.playerModel.buildingModels)
        {
            var viewModel = factory.createBuildingViewModel(buildingModel);
            var view = factory.createBuildingView(viewModel);
        }
    }
}


