import { _decorator, Component } from 'cc';
import { AssetPack } from '../assetPack/AssetPack';
import { IBuildingPopupViewModel } from './IBuildingPopupViewModel';
import { PopupView } from '../ui/PopupView';
const { ccclass } = _decorator;

@ccclass('BuildingPopupView')
export abstract class BuildingPopupView<T extends IBuildingPopupViewModel> extends PopupView {
    
    private _assetPack!: AssetPack;
    private _viewModel!: T;

    init(assetPack: AssetPack, viewModel: T) {
        this._assetPack = assetPack;
        this._viewModel = viewModel;
        this.onInit();
    }

    protected get assetPack(): AssetPack {
        return this._assetPack;
    } 

    protected abstract onInit(): void;

    protected get viewModel(): T {
        return this._viewModel;
    }
}


