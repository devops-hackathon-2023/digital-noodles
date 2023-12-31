import {DashboardCell, DashboardConfig, PrismaClient, StatType} from "@prisma/client";
import {inject, injectable} from "tsyringe";
import {DashboardType} from "@/backend/utils/types";
import {AuthContext} from "@/backend/auth/AuthContext";
import {prisma} from "@/backend/prisma/implementation";
import DOPOClient from "@/backend/services/clients/DOPOClient";
import UpdateDashboardConfigRequest from "@/backend/requests/UpdateDashboardConfigRequest";
import hash from "object-hash"
import PinItemToDashboardConfigRequest from "@/backend/requests/PinItemToDashboardConfigRequest";
import UnPinItemToDashboardConfigRequest from "../requests/UnPinItemToDashboardConfigRequest";

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
                dashboardCells: true,
                pinnedItems: true
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
            case DashboardType.APP_MODULE:
                const deploymentUnits = await this.DOPOClient.getDeploymentUnits({ appModuleId: typeId, size: 100 });
                const envs = [ "DEV", "INT", "PRS", "PRED", "PROD" ];
                let deploymentVersionPromises: Promise<any>[] = []
                let deploymentPromises: Promise<any>[] = []

                deploymentUnits.page.forEach((deploymentUnit) => {
                    envs.forEach((env) => {
                        deploymentPromises.push(this.DOPOClient.getDeployments({ env, deploymentUnitId: deploymentUnit.id, sort: 'startedAt', order: 'desc' })
                            .then((response) => {
                                if(response.page.length > 0)
                                    return response.page[0]
                                else
                                    return null;
                            }))
                    })

                    deploymentVersionPromises.push(
                        this.DOPOClient.getDeploymentUnitVersions(deploymentUnit.id, { sort: 'version', order: 'desc' })
                            .then((response) => {
                                if(response.page.length > 0)
                                    return response.page[0]
                                else
                                    return null;
                            }))
                })

                const deployments = await Promise.all(deploymentPromises)
                const deploymentUnitVersions = await Promise.all(deploymentVersionPromises)

                const rv: any = {};
                envs.forEach((env) => {
                    rv[env] = deploymentUnits.page.map((deploymentUnit) => ({
                        deploymentUnit,
                        deploymentUnitVersion: deploymentUnitVersions.find((deploymentUnitVersion) => deploymentUnitVersion.deploymentUnitId === deploymentUnit.id) ?? null,
                        deployment: deployments.find(deployment => deployment.deploymentUnitId === deploymentUnit.id && deployment.environment === env) ?? null
                    })).map(rvItem => ({ id: hash(rvItem), ...rvItem }))
                })
                return rv;
            case DashboardType.SAS:
                let dashboardConfig = await this.prisma.dashboardConfig.findFirst({
                    where: {
                        dashboardType: dashboardType,
                        typeId: typeId
                    },
                    include: {
                        pinnedItems: true
                    }
                })

                if(dashboardConfig === null && this.authContext.getUser() !== null) {
                    dashboardConfig = await this.prisma.dashboardConfig.create({
                        data: {
                            dashboardType, typeId, userId: this.authContext.getUser()!.id, env: ""
                        }, include: {
                            pinnedItems: true
                        }
                    })
                }

                // @ts-ignore
                return await this.mapSASDashboard(dashboardConfig);
        }

        return {
            typeId, dashboardType
        }
    }

    private async mapSASDashboard(dashboardConfig: DashboardConfig) {
        // @ts-ignore
        const promises = dashboardConfig.pinnedItems.map(async pinnedItem => {
            switch (pinnedItem.type) {
                case DashboardType.APP_MODULE:
                    const appModule = await this.DOPOClient.getAppModule(pinnedItem.typeId)
                    return {
                        type: "APP_MODULE",
                        item: appModule
                    }
                case DashboardType.DEPLOYMENT_UNIT:
                    const deploymentUnit = await this.DOPOClient.getDeploymentUnit(pinnedItem.typeId)
                    return {
                        type: "DEPLOYMENT_UNIT",
                        item: deploymentUnit
                    }
            }
        })

        const items = await Promise.all(promises);

        return items;
    }

    private async getDashboardConfigById(id: string) {
        return prisma.dashboardConfig.findFirst({
            where: {
                id
            }, include: {
                dashboardCells: true,
                pinnedItems: true
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

    async pin(typeId: string, data: PinItemToDashboardConfigRequest) {
        const dashboardConfigs = await this.fetchDashboardConfigs(typeId, DashboardType.SAS);
        let dashboardConfig;
        if(dashboardConfigs.length === 0)
            dashboardConfig = await this.prisma.dashboardConfig.create({
                data: {
                    dashboardType: DashboardType.SAS, userId: this.authContext.getUser()!.id, env: '', typeId: typeId
                }
            })
        else
            dashboardConfig = dashboardConfigs[0]

        if(await this.prisma.dashboardPinnedItem.findFirst({
            where: {
                dashboardConfigId: dashboardConfig.id, type: data.itemType, typeId: data.itemId
            }
        }) === null) {
            await this.prisma.dashboardPinnedItem.create({
                data: {
                    dashboardConfigId: dashboardConfig.id, type: data.itemType, typeId: data.itemId
                }
            })
        }

    }

    async unpin(typeId: string, data: UnPinItemToDashboardConfigRequest) {
        const dashboardConfigs = await this.fetchDashboardConfigs(typeId, DashboardType.SAS);
        let dashboardConfig;
        if(dashboardConfigs.length === 0) {
            console.log("Was 0");
            dashboardConfig = await this.prisma.dashboardConfig.create({
                data: {
                    dashboardType: DashboardType.SAS, userId: this.authContext.getUser()!.id, env: '', typeId: typeId
                }
            })
        }
        else
            dashboardConfig = dashboardConfigs[0]

        await this.prisma.dashboardPinnedItem.deleteMany({
            where: {
                dashboardConfigId: dashboardConfig.id, type: data.itemType, typeId: data.itemId
            }
        });

        return await this.mapSASDashboard(dashboardConfig as any);
    }
}

export default DashboardConfigService