import {DashboardType} from "@/backend/utils/types";

export default class PinItemToDashboardConfigRequest {
    itemId: string
    itemType: DashboardType

    constructor(itemId: string, itemType: DashboardType) {
        this.itemId = itemId;
        this.itemType = itemType;
    }
}