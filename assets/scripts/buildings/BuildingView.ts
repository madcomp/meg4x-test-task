import { _decorator, Component } from 'cc';
import { IBuildingViewModel } from './IBuildingViewModel';
const { ccclass } = _decorator;

@ccclass('BuildingView')
export abstract class BuildingView<T extends IBuildingViewModel> extends Component {
    
    private _viewModel!: T;

    init(viewModel: T) {
        this._viewModel = viewModel;
        this.node.position = this._viewModel.getPosition();
        this.onInit();
    }

    protected get viewModel(): T {
        return this._viewModel;
    }

    protected abstract onInit(): void;
}


