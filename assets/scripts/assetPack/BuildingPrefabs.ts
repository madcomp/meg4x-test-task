import { _decorator, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BuildingPrefabs')
export class BuildingPrefabs {
    @property
    readonly buildingId: string = "";

    @property(Prefab)
    buildingView!: Prefab;

    @property(Prefab)
    buildingPopupView!: Prefab;
}