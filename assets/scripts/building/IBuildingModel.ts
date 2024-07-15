import { Vec3 } from "cc";

export interface IBuildingModel {
    getId(): string;
    getPosition(): Vec3;
}