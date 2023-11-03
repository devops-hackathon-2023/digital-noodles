import "reflect-metadata"
import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import {container} from "tsyringe";
import SearchService from "@/backend/services/SearchService";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
    const { query } = req.query;
    const searchService = container.resolve(SearchService)
    res.json( await searchService.search(query as string))
});

export default router.handler();