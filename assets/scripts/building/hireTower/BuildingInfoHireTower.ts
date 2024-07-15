import { Vec3 } from "cc";
import { BuildingInfo } from "../BuildingInfo";

export class BuildingInfoHireTower extends BuildingInfo {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly cost: number,
        public readonly position: Vec3,
        public readonly hireSlots: number,
    ) {
        super(id, name, description, cost, position);
    }
}


