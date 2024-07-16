import { IBuildingModel } from "./IBuildingModel";
import { IBuildingPopupViewModel } from "./IBuildingPopupViewModel";
import { UIManager } from "../ui/UIManager";
import { GameInfo } from "../GameInfo";
import { PlayerModel } from "../player/PlayerModel";

export abstract class BuildingPopupViewModel<T extends IBuildingModel> implements IBuildingPopupViewModel {
    
    constructor(
        protected readonly gameInfo: GameInfo,
        protected readonly playerModel: PlayerModel,
        protected readonly uiManager: UIManager,
        protected readonly model: T)
    {}
    
    abstract getDescription(): string;

    getId(): string {
        return this.model.getId();
    }

    abstract getTitle(): string;

    getPlayerModel(): PlayerModel {
        return this.playerModel;
    }
}


