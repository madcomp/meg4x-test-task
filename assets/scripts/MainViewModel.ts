import { _decorator, Component, Input, input, EventKeyboard, KeyCode, Node } from 'cc';
import { BuildingPrefabs } from './building/BuildingPrefabs';
import { DataLoader } from './data/DataLoader';
import { DataToLoad } from './data/DataToLoad';
import { HUDCurrency } from './ui/HUDCurrency';
import { ModelViewModelFactory } from './factory/ModelViewModelFactory';
import { PlayerModel } from './player/PlayerModel';
import { PlayerViewModel } from './player/PlayerViewModel';
import { UIManager } from './ui/UIManager';
import { ViewFactory } from './factory/ViewFactory';
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
    private popupParent!: Node;

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

        let viewFactory = new ViewFactory(this.buildingsPrefabs, this.popupParent, this.viewsParent);
        let uiManager = new UIManager(viewFactory);
        let modelViewModelfactory = new ModelViewModelFactory(buildingInfos, uiManager);

        this.playerModel = new PlayerModel(playerState, modelViewModelfactory);
        this.playerViewModel = new PlayerViewModel(this.playerModel);
        this.hudCurrency.init(this.playerViewModel);

        for (var buildingModel of this.playerModel.buildingModels)
        {
            var viewModel = modelViewModelfactory.createBuildingViewModel(buildingModel);
            viewFactory.createBuildingView(viewModel);
        }
    }
}


