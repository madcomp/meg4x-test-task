import { Vec3 } from "cc";
import { PlayerModel } from "../player/PlayerModel";

export interface IBuildingModel {
    getId(): string;
    getPosition(): Vec3;
    update(deltaTime: number, playerModel: PlayerModel): void;
}