import {injectable} from "tsyringe";
import axios, {Axios} from "axios";

export type DOPOResponse<T> = {
    pageNumber: number;
    pageCount: number;
    nextPage: null | string;
    pageSize: number;
    itemsTotalCount: number;
    page: T[];
}

export type GetDeploymentsArgs = {
    deploymentUnitId?: string
    env?: string
}

export type GetSASesArgs = {
    query?: string,
    size?: number
}

export type GetDeploymentUnitsArgs = {
    size?: number
}

export type GetQualityGatesArgs = {
    deploymentUnitId?: string
}

export type GetAppModulesArgs = { size?: number }

export type Deployment = {
    id: string;
    versionId: string;
    deploymentUnitId: string;
    appModuleId: string;
    sasId: string;
    environment: string;
    status: string;
    changeTicketId: string;
    deployer: string;
    platform: string;
    startedAt: string;
    finishedAt: string;
    duration: number;
};

export type QualityGate = {
    versionId: string,
    deploymentUnitId: string,
    appModuleId: string,
    sasId: string,
    type: string,
    result: string,
    percent: number,
    rating: "A" | "B" | "C" | "D" | "E" | "F",
    createdAt: string
}

@injectable()
class DOPOClient {
    private axios: Axios
    constructor() {
        this.axios = axios.create({
            baseURL: "https://dopo.fly.dev/api/v1/dopo",
            auth: {
                username: process.env.DOPO_API_USERNAME as string,
                password: process.env.DOPO_API_PASSWORD as string
            }
        })
    }

    public async getDeployments(args: GetDeploymentsArgs): Promise<DOPOResponse<Deployment>> {
        const params: any = {
            deploymentUnitId: args.deploymentUnitId
        }

        if(args.env) {
            params.environment = args.env
        }

        return await this.axios.get('/deployments', { params })
            .then((response) => response.data)
    }

    public async getSASes(args: GetSASesArgs) {
        const results = await this.axios.get('/sases', {
            params: {
                size: args.size ?? 30
            }
        }).then(response => response.data)

        return results;
    }

    async getAppModules(args: GetAppModulesArgs) {
        return await this.axios.get('/app-modules', {
            params: {
                size: args.size ?? 30
            }
        }).then(response => response.data)
    }

    async getQualityGates(args: GetQualityGatesArgs): Promise<DOPOResponse<QualityGate>> {
        const params: any = {}
        if(args.deploymentUnitId) {
            params.deploymentUnitId = args.deploymentUnitId
        }

        return await this.axios.get('/quality-gates', {
            params
        }).then(response => response.data)
    }

    async getDeploymentUnits(args: GetDeploymentUnitsArgs) {
        return await this.axios.get('/deployment-units', {
            params: {
                size: args.size ?? 30
            }
        }).then(response => response.data)
    }
}

export default DOPOClient