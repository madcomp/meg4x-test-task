import { _decorator, Node } from 'cc';
import { BuildingViewModelHireTower } from './BuildingViewModelHireTower';
import { BuildingView } from '../BuildingView';
const { ccclass, property } = _decorator;

@ccclass('BuildingViewHireTower')
export class BuildingViewHireTower extends BuildingView<BuildingViewModelHireTower> {
    protected onInit(): void {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onClick, this);
    }

    private onClick() {
        this.viewModel.select();
    }
}


