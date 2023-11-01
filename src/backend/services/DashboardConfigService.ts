import { PrismaClient } from "@prisma/client";
import {inject, injectable} from "tsyringe";
import {DashboardType} from "@/backend/utils/types";
import {AuthContext} from "@/backend/auth/AuthContext";

@injectable()
class DashboardConfigService {
    constructor(
        @inject('PrismaClient')
        private prisma: PrismaClient,
        @inject(AuthContext)
        private authContext: AuthContext
    ) {}


    async show(typeId: string, dashboardType: DashboardType) {
        console.log(typeId)
        console.log(dashboardType)

        console.log(this.authContext.getUser())

        return {
            typeId, dashboardType
        }
    }
}

export default DashboardConfigService