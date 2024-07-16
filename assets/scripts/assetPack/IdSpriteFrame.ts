import { _decorator, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('IdSpriteFrame')
export class IdSpriteFrame {
    @property
    readonly id: string = "";

    @property(SpriteFrame)
    readonly spriteFrame!: SpriteFrame;
}