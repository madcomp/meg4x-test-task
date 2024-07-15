import { _decorator, Component, Node } from 'cc';
import { BuildingViewModelHireTower } from './BuildingViewModelHireTower';
import { BuildingView } from '../BuildingView';
const { ccclass, property } = _decorator;

@ccclass('BuildingViewHireTower')
export class BuildingViewHireTower extends BuildingView<BuildingViewModelHireTower> {
    protected onInit(): void {
        // todo: handle click.
    }
}


