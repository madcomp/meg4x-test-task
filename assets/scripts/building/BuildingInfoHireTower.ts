import { BuildingInfo } from "./BuildingInfo";

export class BuildingInfoHireTower extends BuildingInfo {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly cost: number,
        public readonly hireSlots: number
    ) {
        super(id, name, description, cost);
    }
}


