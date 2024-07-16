import { _decorator, Component, Input, input, EventKeyboard, KeyCode, Node, SpriteFrame, Asset, Prefab } from 'cc';
import { BuildingPrefabs } from './assetPack/BuildingPrefabs';
import { DataLoader } from './data/DataLoader';
import { DataToLoad } from './data/DataToLoad';
import { GameInfo } from './GameInfo';
import { HUDCurrency } from './ui/HUDCurrency';
import { IdSpriteFrame } from './assetPack/IdSpriteFrame';
import { ModelViewModelFactory } from './factory/ModelViewModelFactory';
import { PlayerModel } from './player/PlayerModel';
import { UIManager } from './ui/UIManager';
import { ViewFactory } from './factory/ViewFactory';
import { AssetPack } from './assetPack/AssetPack';
import { CurrencyViewModel } from './player/CurrencyViewModel';
import { HUDSignpost } from './ui/HUDSignpost';
import { SignpostViewModel } from './player/SignpostViewModel';
const { ccclass, property } = _decorator;

@ccclass('MainViewModel')
export class MainViewModel extends Component {

    @property(HUDCurrency)
    private hudCurrency!: HUDCurrency;

    @property(HUDSignpost)
    private hudSignpost!: HUDSignpost;

    @property(Node)
    private popupParent!: Node;

    @property(Node)
    private viewsParent!: Node;

    @property(DataToLoad)
    private dataToLoad!: DataToLoad;

    @property(Prefab)
    private heroesPopupViewPrefab!: Prefab;

    @property([BuildingPrefabs])
    private buildingsPrefabs: BuildingPrefabs[] = [];

    @property([IdSpriteFrame])
    private heroRankSpriteFrames: IdSpriteFrame[] = [];

    @property([IdSpriteFrame])
    private heroSpriteFrames: IdSpriteFrame[] = [];

    @property([IdSpriteFrame])
    private elementalTypeSpriteFrames: IdSpriteFrame[] = [];

    private playerModel! : PlayerModel;

    start() {
        let buildingInfos = DataLoader.loadBuildingInfos(this.dataToLoad.buildings);
        let heroInfoById = DataLoader.loadHeroInfoById(this.dataToLoad.heroes);
        let gameInfo = new GameInfo(buildingInfos, heroInfoById);
        
        let assetsPack = new AssetPack(
            this.buildingsPrefabs,
            this.heroesPopupViewPrefab,
            this.heroSpriteFrames,
            this.heroRankSpriteFrames,
            this.elementalTypeSpriteFrames
        );

        let modelViewModelFactory = new ModelViewModelFactory(gameInfo);
        let viewFactory = new ViewFactory(assetsPack, this.popupParent, this.viewsParent);

        let playerState = DataLoader.loadPlayerState(this.dataToLoad.initialState);
        this.playerModel = new PlayerModel(playerState, modelViewModelFactory);

        let uiManager = new UIManager(this.playerModel, modelViewModelFactory, viewFactory);

        this.hudCurrency.init(new CurrencyViewModel(this.playerModel));
        this.hudSignpost.init(uiManager, new SignpostViewModel(uiManager, this.playerModel));

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