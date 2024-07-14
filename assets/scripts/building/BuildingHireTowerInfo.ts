import { BuildingInfo } from "./BuildingInfo";

export class BuildingHireTowerInfo extends BuildingInfo {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public cost: number,
        public hireSlots: number
    ) {
        super(id, name, description, cost);
    }
}


