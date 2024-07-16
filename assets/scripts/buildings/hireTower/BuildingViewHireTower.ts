import { _decorator, Node } from 'cc';
import { BuildingViewModelHireTower } from './BuildingViewModelHireTower';
import { BuildingView } from '../BuildingView';
const { ccclass, property } = _decorator;

@ccclass('BuildingViewHireTower')
export class BuildingViewHireTower extends BuildingView<BuildingViewModelHireTower> {
    
    @property(Node)
    hiringIndicator!: Node;

    protected onInit(): void {
        this.node.on(Node.EventType.MOUSE_DOWN, this.onClick, this);
        this.hiringIndicator.active = false;
        this.viewModel.hiringChanges().subscribe(this.refresh.bind(this));
    }

    private onClick() {
        this.viewModel.select();
    }

    private refresh() {
        this.hiringIndicator.active = this.viewModel.isHiringHeroes();
    }
}


