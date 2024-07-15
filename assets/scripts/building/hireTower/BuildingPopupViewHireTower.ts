import { _decorator, Node } from 'cc';
import { BuildingPopupView } from '../BuildingPopupView';
import { BuildingPopupViewModelHireTower } from './BuildingPopupViewModelHireTower';
const { ccclass, property } = _decorator;

@ccclass('BuildingViewHireTower')
export class BuildingPopupViewHireTower extends BuildingPopupView<BuildingPopupViewModelHireTower> {
    protected onInit(): void {
    }
}


