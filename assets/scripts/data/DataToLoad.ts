import { _decorator, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataToLoad')
export class DataToLoad {
    @property(JsonAsset)
    initialState!: JsonAsset;

    @property(JsonAsset)
    buildings!: JsonAsset;

    @property(JsonAsset)
    heroes!: JsonAsset;
}