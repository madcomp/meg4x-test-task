import { _decorator, Component } from 'cc';
import { IBuildingPopupViewModel } from './IBuildingPopupViewModel';
const { ccclass } = _decorator;

@ccclass('BuildingPopupView')
export abstract class BuildingPopupView<T extends IBuildingPopupViewModel> extends Component {
    
    private buildingViewModel!: T;

    close() {
        this.node.destroy();
    }

    init(viewModel: T) {
        this.buildingViewModel = viewModel;
        this.onInit();
    }

    protected abstract onInit(): void;

    protected get viewModel(): T {
        return this.buildingViewModel;
    }
}


