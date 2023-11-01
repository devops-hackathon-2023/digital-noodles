import "reflect-metadata"
import "@/backend/prisma/symbols"
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import {auth} from "@/backend/auth/middleware";
import {container} from "tsyringe";
import DashboardConfigService from "@/backend/services/DashboardConfigService";
import {plainToClass} from "class-transformer";
import UpdateDashboardConfigRequest from "@/backend/requests/UpdateDashboardConfigRequest";

const router = createRouter<NextApiRequest, NextApiResponse>();

// router.use(auth)

router.put(async (req, res) => {
    const { dashboardConfigId } = req.query;
    const dashboardConfigService = container.resolve(DashboardConfigService);
    const data = plainToClass(UpdateDashboardConfigRequest, req.body as object)
    const updated = await dashboardConfigService.update(dashboardConfigId as string, data);
    res.json(updated);
});

export default router.handler()