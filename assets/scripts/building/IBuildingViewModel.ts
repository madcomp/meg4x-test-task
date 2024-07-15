import { Vec3 } from "cc";

export interface IBuildingViewModel {
    getId(): string;
    getPosition(): Vec3;
    select(): void;
}