import {inject, injectable} from "tsyringe";
import {PrismaClient} from "@prisma/client";
import {AuthContext} from "@/backend/auth/AuthContext";
import DOPOClient from "@/backend/services/clients/DOPOClient";

@injectable()
class DashboardCellService {
    readonly MAX_DATA_LEN: number = 5;

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

    generateNewRAMUsageAmountInMB(lastRAMUsage: number) {
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

    private generateTimestamp (now: Date, idx: number) {
        return (this.subtractMinutesFromDate(now, idx * 10))
    }

    private createInitialMockData(cellId: string, ceilKey: string,  ceil: number) {
        const now = new Date(Date.now());
        return [
            ...Array.from(Array(this.MAX_DATA_LEN).keys()).map((idx) => ({
                [ ceilKey ]: ceil,
                time: this.generateTimestamp(now, idx).toISOString(),
                cellId: cellId
            }))
        ]
    }

    /**
     *
     * @param cellId
     * @param prevData - Data from previous run to make valid data in time series
     */
    async showData(cellId: string, prevData?: any[]) {
        const now = new Date(Date.now());
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
            case "SYSTEM_RAM_USAGE": {
                const data = await this.prisma.ramUsageMock.findMany({
                    where: {
                        cellId: dashboardCell.id
                    }
                })

                if (data.length < this.MAX_DATA_LEN) {
                    await this.prisma.ramUsageMock.createMany({
                        data: this.createInitialMockData(dashboardCell.id, "amountInMB", 2000) as any
                    })
                } else {
                    await this.prisma.ramUsageMock.create({
                        data: {
                            amountInMB: this.generateNewRAMUsageAmountInMB(data[data.length - 1].amountInMB),
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
                    take: this.MAX_DATA_LEN
                })

                return rv.reverse();
            }

            case "SYSTEM_CPU_USAGE": {
                const data = await this.prisma.cpuUsageMock.findMany({
                    where: {
                        cellId: dashboardCell.id
                    }
                })

                if(data.length < this.MAX_DATA_LEN) {
                    await this.prisma.cpuUsageMock.createMany({
                        data: [
                            ...Array.from(Array(this.MAX_DATA_LEN).keys()).map((idx) => ({
                                core1Percent: Math.random() * 100,
                                core2Percent: Math.random() * 100,
                                core3Percent: Math.random() * 100,
                                core4Percent: Math.random() * 100,
                                coreNum: 4,
                                time: this.generateTimestamp(new Date(Date.now()), idx).toISOString(),
                                cellId: dashboardCell.id
                            }))
                        ]
                    })
                }
                else {
                    await this.prisma.cpuUsageMock.create({
                        data: {
                            time: now.toISOString(),
                            core1Percent: Math.random() * 100,
                            core2Percent: Math.random() * 100,
                            core3Percent: Math.random() * 100,
                            core4Percent: Math.random() * 100,
                            cellId: dashboardCell.id,
                            coreNum: data[0].coreNum
                        }
                    })
                }

                const rv = await this.prisma.cpuUsageMock.findMany({
                    where: {
                        cellId: dashboardCell.id
                    },
                    orderBy: {
                        id: 'desc'
                    },
                    take: this.MAX_DATA_LEN
                })

                return rv.reverse();
            }

            case "HEALTHCHECK": {
                return {
                    alive: Math.random() > 0.8
                }
            }
            case "STATS_LAST_DEPLOYMENT_BUILD_TIME": {
                const deployments = await this.DOPOClient.getDeployments({ env: dashboardCell.dashboardConfig.env })

                if(deployments.page.length === 0) {
                    return {
                        time: "N/A"
                    }
                }

                return {
                    time: deployments.page[0].duration
                }
            }
            case "STATS_GATES_FAILED_PASSED": {
                const qualityGates = await this.DOPOClient.getQualityGates({
                    deploymentUnitId: dashboardCell.dashboardConfig.typeId
                });

                console.log(qualityGates);
            }
        }
    }
}

export default DashboardCellService