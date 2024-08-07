import { _decorator, Component, Label, Node } from 'cc';
import { SignpostViewModel } from '../player/SignpostViewModel';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('HUDSignpost')
export class HUDSignpost extends Component {

    @property(Node)
    private badge!: Node;

    @property(Node)
    private container!: Node;

    @property(Label)
    private labelCount!: Label;

    _signpostViewModel!: SignpostViewModel;
    _uiManager!: UIManager;

    init(uiManager: UIManager, signpostViewModel: SignpostViewModel) {
        this._signpostViewModel = signpostViewModel;
        this._uiManager = uiManager;
        signpostViewModel.subject.subscribe(this.refresh.bind(this));
        this.node.on(Node.EventType.MOUSE_DOWN, this.onClick, this);
        this.container.active = false;
    }

    private refresh() {
        let newHeroesCount = this._signpostViewModel.newHeroesCount;
        this.labelCount.string = newHeroesCount.toString();
        this.container.active = true;
        this.badge.active = newHeroesCount > 0;
    }

    private onClick() {
        this._signpostViewModel.resetNewHeroesCount();
        this._uiManager.showHeroesPopupView();
    }
}


