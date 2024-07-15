import { _decorator, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataToLoad')
export class DataToLoad {
    @property(JsonAsset)
    readonly initialState!: JsonAsset;

    @property(JsonAsset)
    readonly buildings!: JsonAsset;

    @property(JsonAsset)
    readonly heroes!: JsonAsset;
}