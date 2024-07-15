export abstract class BuildingInfo {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly cost: number
    ) {}
}