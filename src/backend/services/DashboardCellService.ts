import {inject, injectable} from "tsyringe";
import {PrismaClient} from "@prisma/client";
import {AuthContext} from "@/backend/auth/AuthContext";
import DOPOClient from "@/backend/services/clients/DOPOClient";

@injectable()
class DashboardCellService {
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient,
        @inject(AuthContext)
        private authContext: AuthContext,
        @inject(DOPOClient)
        private DOPOClient: DOPOClient
    ) {
    }

    /**
     *
     * @param cellId
     * @param prevData - Data from previous run to make valid data in time series
     */
    async showData(cellId: string, prevData?: any[]) {
        const dashboardCell = await this.prisma.dashboardCell.findFirst({
            where: {
                id: cellId
            },
            include: {
                dashboardConfig: true
            }
        })

        if (!dashboardCell) {
            // TODO: Error handling
            return
        }

        switch (dashboardCell.statType) {
            case "STATS_AVG_BUILD_TIME":
                const deployments = await this.DOPOClient.getDeployments({
                    deploymentUnitId: dashboardCell.dashboardConfig.typeId,
                    env: dashboardCell.dashboardConfig.env
                })
                const sumDurations = deployments.page.map(deployment => deployment.duration).reduce((prev, curr) => prev + curr);
                const avg = sumDurations / deployments.page.length;

                return {
                    avg
                }
            case "SYSTEM_RAM_USAGE":
                console.log(prevData)
        }
    }
}

export default DashboardCellService