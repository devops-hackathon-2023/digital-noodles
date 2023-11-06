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
    order?: 'asc' | 'desc',
    sort?: 'startedAt' | 'finishedAt'
}

export type GetDeploymentUnitVersionsArgs = {
    env?: string
    order?: 'asc' | 'desc',
    sort?: 'version'
}

export type GetSASesArgs = {
    query?: string,
    size?: number
}

export type GetDeploymentUnitsArgs = {
    appModuleId?: string
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

export type DeploymentUnit = {
    id: string;
    name: string;
    appModuleId: string;
    language: 'JAVASCRIPT' | 'JAVA' | 'KOTLIN' | 'PLSQL' | 'PYTHON' | 'SHELL';
    repositoryUrl: string;
    sasId: string;
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

        if(args.sort) {
            params.sort = args.sort
        }

        if(args.order) {
            params.order = args.order
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

    async getDeploymentUnits(args: GetDeploymentUnitsArgs): Promise<DOPOResponse<DeploymentUnit>> {
        let endpoint = args.appModuleId !== undefined ? `/app-modules/${args.appModuleId}/deployment-units` : '/deployment-units';

        return await this.axios.get(endpoint, {
            params: {
                size: args.size ?? 30
            }
        }).then(response => response.data)
    }

    async getDeploymentUnitVersions(deploymentUnitId: string, args: GetDeploymentUnitVersionsArgs) {
        const params: any = {};

        if(args.env) {
            params.environment = args.env
        }

        if(args.sort) {
            params.sort = args.sort
        }

        if(args.order) {
            params.order = args.order
        }

        return await this.axios.get(`/deployment-units/${deploymentUnitId}/deployment-unit-versions`, { params })
            .then((response) => response.data)
    }
}

export default DOPOClient