import { _decorator, Component } from 'cc';
import { IBuildingViewModel } from './IBuildingViewModel';
const { ccclass } = _decorator;

@ccclass('BuildingView')
export abstract class BuildingView<T extends IBuildingViewModel> extends Component {
    
    private buildingViewModel!: T;

    init(viewModel: T) {
        this.buildingViewModel = viewModel;
        this.node.position = this.buildingViewModel.getPosition();
        this.onInit();
    }

    protected get viewModel(): T {
        return this.buildingViewModel;
    }

    protected abstract onInit(): void;
}


