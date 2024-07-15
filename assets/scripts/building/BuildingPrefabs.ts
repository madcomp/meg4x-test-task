import { _decorator, Component, Prefab } from 'cc';
import { IBuildingViewModel } from './IBuildingViewModel';
import { BuildingView } from './BuildingView';
import { BuildingPopupView } from './BuildingPopupView';
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