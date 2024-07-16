import { _decorator, Component, Input, input, EventKeyboard, KeyCode, Node, SpriteFrame, Asset } from 'cc';
import { BuildingPrefabs } from './assetPack/BuildingPrefabs';
import { DataLoader } from './data/DataLoader';
import { DataToLoad } from './data/DataToLoad';
import { GameInfo } from './GameInfo';
import { HUDCurrency } from './ui/HUDCurrency';
import { IdSpriteFrame } from './assetPack/IdSpriteFrame';
import { ModelViewModelFactory } from './factory/ModelViewModelFactory';
import { PlayerModel } from './player/PlayerModel';
import { PlayerViewModel } from './player/PlayerViewModel';
import { UIManager } from './ui/UIManager';
import { ViewFactory } from './factory/ViewFactory';
import { AssetPack } from './assetPack/AssetPack';
import { PopupViewModelFactory } from './factory/PopupViewModelFactory';
const { ccclass, property } = _decorator;

@ccclass('MainViewModel')
export class MainViewModel extends Component {

    @property(HUDCurrency)
    private hudCurrency!: HUDCurrency;

    @property(Node)
    private popupParent!: Node;

    @property(Node)
    private viewsParent!: Node;

    @property(DataToLoad)
    private dataToLoad!: DataToLoad;

    @property([BuildingPrefabs])
    private buildingsPrefabs: BuildingPrefabs[] = [];

    @property([IdSpriteFrame])
    private heroRankSpriteFrames: IdSpriteFrame[] = [];

    @property([IdSpriteFrame])
    private heroSpriteFrames: IdSpriteFrame[] = [];

    @property([IdSpriteFrame])
    private elementalTypeSpriteFrames: IdSpriteFrame[] = [];

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
        let buildingInfos = DataLoader.loadBuildingInfos(this.dataToLoad.buildings);
        let heroInfoById = DataLoader.loadHeroInfoById(this.dataToLoad.heroes);
        let gameInfo = new GameInfo(buildingInfos, heroInfoById);
        
        let assetsPack = new AssetPack(
            this.buildingsPrefabs,
            this.heroSpriteFrames,
            this.heroRankSpriteFrames,
            this.elementalTypeSpriteFrames
        );

        let modelViewModelFactory = new ModelViewModelFactory(gameInfo);
        let viewFactory = new ViewFactory(assetsPack, this.popupParent, this.viewsParent);
        let uiManager = new UIManager(modelViewModelFactory, viewFactory);

        let playerState = DataLoader.loadPlayerState(this.dataToLoad.initialState);
        this.playerModel = new PlayerModel(playerState, modelViewModelFactory);
        this.playerViewModel = new PlayerViewModel(this.playerModel);
        this.hudCurrency.init(this.playerViewModel);

        modelViewModelFactory.init(this.playerModel, uiManager);

        for (var buildingModel of this.playerModel.buildingModels)
        {
            var viewModel = modelViewModelFactory.createBuildingViewModel(buildingModel);
            viewFactory.createBuildingView(viewModel);
        }
    }

    update(deltaTime: number) {
        this.playerModel.update(deltaTime);
    }
}