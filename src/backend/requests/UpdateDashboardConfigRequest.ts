import {Contains} from "class-validator";

class UpdateDashboardConfigRequest {
    dashboardCellConfigs: {
        id: string | undefined,
        statId: string | undefined,
        statType: string,
        x: number,
        y: number,
        w: number,
        h: number
    }[]

    constructor(dashboardCellConfigs: {
        id: string | undefined,
        statId: string | undefined;
        statType: string;
        x: number;
        y: number;
        w: number;
        h: number
    }[]) {
        this.dashboardCellConfigs = dashboardCellConfigs;
    }
}

export default UpdateDashboardConfigRequest