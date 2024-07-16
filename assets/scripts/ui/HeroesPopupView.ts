import { _decorator, Component, Node } from 'cc';
import { HeroesPopupViewModel } from '../player/HeroesPopupViewModel';
import { AssetPack } from '../assetPack/AssetPack';
import { PopupView } from './PopupView';
const { ccclass, property } = _decorator;

@ccclass('HeroesPopupView')
export class HeroesPopupView extends PopupView {

    init(assetPack: AssetPack, heroesPopupViewModel: HeroesPopupViewModel) {

    }
}


