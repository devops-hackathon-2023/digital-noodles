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

@injectable()
class DOPOClient {
    private axios: Axios
    constructor() {
        this.axios = new Axios({
            baseURL: "https://dopo.fly.dev/api/v1/dopo",
            auth: {
                username: process.env.DOPO_API_USERNAME as string,
                password: process.env.DOPO_API_PASSWORD as string
            }
        })
    }

    public async getDeployments(args: GetDeploymentsArgs): Promise<DOPOResponse<Deployment>> {
        return await axios.get('https://dopo.fly.dev/api/v1/dopo/deployments', { params: {
                deploymentUnitId: args.deploymentUnitId
            }, auth: {
                username: process.env.DOPO_API_USERNAME as string,
                password: process.env.DOPO_API_PASSWORD as string
            }})
            .then((response) => response.data)
    }
}

export default DOPOClient