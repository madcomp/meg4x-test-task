import { Vec3 } from "cc";

export abstract class BuildingInfo {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly cost: number,
        public readonly position: Vec3
    ) {}
}