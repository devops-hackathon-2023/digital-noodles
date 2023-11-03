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

    subtractMinutesFromDate(date: Date, seconds: number) {
        return new Date(date.getTime() - seconds * 1000);
    }

    generateNewRAMUsage(lastRAMUsage: number) {
        let newRAMUsage = lastRAMUsage
        if(Math.random() > 0.5) {
            newRAMUsage = lastRAMUsage + 200
            if(newRAMUsage > 20000)
                newRAMUsage = 15000
        } else {
            newRAMUsage = lastRAMUsage - 200
            if(newRAMUsage < 0) {
                newRAMUsage = 1000
            }
        }

        return newRAMUsage;
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
                const data = await this.prisma.ramUsageMock.findMany({
                    where: {
                        cellId: dashboardCell.id
                    }
                })

                const now = new Date(Date.now());

                if(data.length < 5) {
                    await this.prisma.ramUsageMock.createMany({
                        data: [
                            ...Array.from(Array(10).keys()).map((idx) => ({
                                amountInMB: 2000,
                                time: (this.subtractMinutesFromDate(now, idx * 10)).toISOString(),
                                cellId: dashboardCell.id
                            }))
                        ]
                    })
                }
                else {
                    const newEntry = await this.prisma.ramUsageMock.create({
                        data: {
                            amountInMB: this.generateNewRAMUsage(data[data.length - 1].amountInMB),
                            time: now.toISOString(),
                            cellId: dashboardCell.id
                        }
                    })
                }

                const rv = await this.prisma.ramUsageMock.findMany({
                    where: {
                        cellId: dashboardCell.id
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    take: 5
                })
                console.log("RV" + rv);
                return rv.reverse()
        }
    }
}

export default DashboardCellService