import { _decorator, Component } from 'cc';
import { IBuildingViewModel } from './IBuildingViewModel';
const { ccclass } = _decorator;

@ccclass('BuildingPopupView')
export abstract class BuildingPopupView<T extends IBuildingViewModel> extends Component {
    
    private buildingViewModel!: T;

    protected get viewModel(): T {
        return this.buildingViewModel;
    }

    init(viewModel: T) {
        this.buildingViewModel = viewModel;
    }
}


