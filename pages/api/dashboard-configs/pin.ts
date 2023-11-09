import "reflect-metadata"
import "@/backend/prisma/symbols"
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import {container} from "tsyringe";
import DashboardConfigService from "@/backend/services/DashboardConfigService";
import {plainToClass} from "class-transformer";
import { auth } from "@/backend/auth/middleware";
import PinItemToDashboardConfigRequest from "@/backend/requests/PinItemToDashboardConfigRequest";
import UnPinItemToDashboardConfigRequest from "@/backend/requests/UnPinItemToDashboardConfigRequest";
import {DashboardType} from "@/backend/utils/types";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(auth)

router.post(async (req, res) => {
    const { typeId } = req.query;
    const dashboardConfigService = container.resolve(DashboardConfigService);
    const data = plainToClass(PinItemToDashboardConfigRequest, req.body as object)
    await dashboardConfigService.pin(typeId as string, data);
    res.json(null);
});

router.delete(async (req, res) => {
    const { typeId, itemId, itemType } = req.query;
    const dashboardConfigService = container.resolve(DashboardConfigService);
    //const data = plainToClass(UnPinItemToDashboardConfigRequest, req.body as object)
    const data = await dashboardConfigService.unpin(typeId as string, { itemId: itemId as string, itemType: itemType as DashboardType });
    res.json(data);
});

export default router.handler()