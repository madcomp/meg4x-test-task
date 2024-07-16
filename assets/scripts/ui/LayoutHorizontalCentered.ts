import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property, executeInEditMode  } = _decorator;

@ccclass('LayoutHorizontalCentered')
@executeInEditMode
export class LayoutHorizontalCentered extends Component {
    
    @property
    private spacingX: number = 0;

    onEnable() {
        this.refresh();
    }

    refresh() {
        let activeChildren = this.node.children.filter(child => child.active);
        let childrenWidth = [];
        let width = this.spacingX * (activeChildren.length - 1);

        for (let child of activeChildren)
        {
            let childWidth = child.getComponent(UITransform)!.width;
            childrenWidth.push(childWidth);
            width += childWidth;
        }

        let x = this.node.position.x - 0.5 * width;
        for (let i in activeChildren)
        {
            let halfChildWidth = 0.5 * childrenWidth[i];
            x += halfChildWidth;
            activeChildren[i].position = new Vec3(x, 0, 0);
            x += halfChildWidth + this.spacingX;
        }
    }
}

