import {inject, injectable} from "tsyringe";
import DOPOClient from "@/backend/services/clients/DOPOClient";

type Mappable = {
    name: string
}

@injectable()
class SearchService {
    constructor(
        @inject(DOPOClient)
        private dopoClient: DOPOClient
    ) {}

    private mapResult(mappable: Mappable, type: string) {
        return { label: mappable.name, type, data: mappable }
    }

    public async search(query: string) {
        const { page: sases } = await this.dopoClient.getSASes({ size: 100 });
        const { page: deploymentUnits } = await this.dopoClient.getDeploymentUnits({ size: 100 });

        return [ ...sases.map((sas: Mappable) => this.mapResult(sas, "SAS")), ...deploymentUnits.map((appModule: Mappable) => this.mapResult(appModule, "DEPLOYMENT_UNIT")) ]
    }
}

export default SearchService