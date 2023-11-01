import "reflect-metadata";
import {createRouter} from "next-connect";
import "@/backend/prisma/symbols"
import {NextApiRequest, NextApiResponse} from "next";
import {container} from "tsyringe";
import DashboardCellService from "@/backend/services/DashboardCellService";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { id } = req.query
    const dashboardCellService = container.resolve(DashboardCellService);
    res.json(await dashboardCellService.showData(id as string));
})

export default router.handler();