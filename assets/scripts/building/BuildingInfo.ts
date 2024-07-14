export abstract class BuildingInfo {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public cost: number
    ) {}
}