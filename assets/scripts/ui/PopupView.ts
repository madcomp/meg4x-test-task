import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('PopupView')
export abstract class PopupView extends Component {
    close() {
        this.node.emit("close");
    }
}


