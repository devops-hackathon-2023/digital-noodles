import {DashboardCell, DashboardConfig, PrismaClient, StatType } from "@prisma/client";
import {inject, injectable} from "tsyringe";
import {DashboardType} from "@/backend/utils/types";
import {AuthContext} from "@/backend/auth/AuthContext";
import {prisma} from "@/backend/prisma/implementation";
import axios from "axios";
import config from "tailwindcss/defaultConfig";
import DOPOClient from "@/backend/services/clients/DOPOClient";
import UpdateDashboardConfigRequest from "@/backend/requests/UpdateDashboardConfigRequest";

@injectable()
class DashboardConfigService {
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient,
        @inject(AuthContext)
        private authContext: AuthContext,
        @inject(DOPOClient)
        private DOPOClient: DOPOClient
    ) {}

    private async fetchDashboardConfigs(typeId: string, dashboardType: DashboardType) {
        return prisma.dashboardConfig.findMany({
            where: {
                typeId: typeId,
                dashboardType: dashboardType,
                userId: this.authContext.getUser()?.id
            }, include: {
                dashboardCells: true
            }
        });
    }

    private async createDefaultDeploymentUnitDashboardConfig(typeId: string, deploymentEnv: string) {
        const dashboardConfig = await prisma.dashboardConfig.create({
            data: {
                dashboardType: DashboardType.DEPLOYMENT_UNIT,
                typeId: typeId,
                userId: this.authContext.getUser()?.id as string,
                env: deploymentEnv
            }
        })

        const avgBuildTimeCell = await prisma.dashboardCell.create({
            data: {
                dashboardConfigId: dashboardConfig.id,
                statType: "STATS_AVG_BUILD_TIME",
                x: 0,
                y: 0,
                w: 2,
                h: 2
            }
        })

        return dashboardConfig;
    }

    /**
     * Either shows all boards for all environments if they exist for the user or creates them.
     * @param typeId
     * @param dashboardType
     */
    async index(typeId: string, dashboardType: DashboardType) {
        const dashboardConfigs = await this.fetchDashboardConfigs(typeId, dashboardType);

        switch (dashboardType) {
            case DashboardType.DEPLOYMENT_UNIT:
                const configEnvs = [...new Set<string>(dashboardConfigs.map((config: DashboardConfig) => config.env))]
                const deploymentEnvs = await this.DOPOClient.getDeployments({ deploymentUnitId: typeId })
                    .then((deployment) =>
                        [...new Set<string>(deployment.page.map((deployment: any) => deployment.environment))]
                    )

                await Promise.all(deploymentEnvs.map(async (deploymentEnv) => {
                    if(!configEnvs.includes(deploymentEnv)) {
                        return this.createDefaultDeploymentUnitDashboardConfig(typeId, deploymentEnv)
                    }

                    return Promise.resolve()
                }))

                await Promise.all((configEnvs.map(async (configEnv) => {
                    if(!deploymentEnvs.includes(configEnv)) {
                        const configToDelete = dashboardConfigs.find((config) => config.env === configEnv);
                        if(configToDelete) {
                            return prisma.dashboardConfig.delete({ where: { id: configToDelete.id } })
                        }
                    }

                    return Promise.resolve();
                })))


                return await this.fetchDashboardConfigs(typeId, dashboardType);
        }

        return {
            typeId, dashboardType
        }
    }

    private async getDashboardConfigById(id: string) {
        return prisma.dashboardConfig.findFirst({
            where: {
                id
            }, include: {
                dashboardCells: true
            }
        });
    }

    async update(dashboardConfigId: string, data: UpdateDashboardConfigRequest) {
        const dashboardConfig = await this.prisma.dashboardConfig.findFirst({
            where: {
                id: dashboardConfigId
            },
            include: {
                dashboardCells: true
            }
        })

        if(!dashboardConfig) {
            // TODO: error handling
            return
        }

        let cellsToDelete: DashboardCell[] = [];
        let cellsToCreate = data.dashboardCellConfigs.filter((dashboardConfig) => dashboardConfig.id === undefined);
        let cellsToUpdate = data.dashboardCellConfigs.filter(dashboardConfig => dashboardConfig.id !== undefined);

        dashboardConfig.dashboardCells.forEach((dashboardCell) => {
            if(!data.dashboardCellConfigs.filter((dashboardConfig) => dashboardConfig.id !== undefined)
                .map((dashboardCellConfig) => dashboardCellConfig.id).includes(dashboardCell.id))
                cellsToDelete.push(dashboardCell);
        })

        await this.prisma.dashboardCell.deleteMany({
            where: {
                id: {
                    in: cellsToDelete.map(cellsToDelete => cellsToDelete.id)
                }
            }
        });

        await this.prisma.dashboardCell.createMany({
            data: cellsToCreate.map((cellToCreate) => ({
                dashboardConfigId: dashboardConfig.id,
                statType: cellToCreate.statType as StatType,
                x: cellToCreate.x,
                y: cellToCreate.y,
                h: cellToCreate.h,
                w: cellToCreate.w
            }))
        })

        await Promise.all(cellsToUpdate.map((cellToUpdate) => {
            return prisma.dashboardCell.update({
                where: {
                    id: cellToUpdate.id
                },
                data: {
                    x: cellToUpdate.x,
                    y: cellToUpdate.y,
                    h: cellToUpdate.h,
                    w: cellToUpdate.w
                }
            })
        }))

        return await this.getDashboardConfigById(dashboardConfigId);
    }
}

export default DashboardConfigService