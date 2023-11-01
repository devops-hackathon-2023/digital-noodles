import "reflect-metadata";
import "@/backend/prisma/symbols"
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import {container} from "tsyringe";
import DashboardConfigService from "@/backend/services/DashboardConfigService";
import {DashboardType} from "@/backend/utils/types";
import {auth} from "@/backend/auth/middleware";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(auth);

router.get(async (req, res) => {
    const { typeId, dashboardType } = req.query
    const dashboardConfigService = container.resolve(DashboardConfigService);
    res.json(await dashboardConfigService.show(typeId as string, dashboardType as DashboardType));
});

export default router.handler();