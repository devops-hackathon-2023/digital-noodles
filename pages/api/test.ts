import {createRouter} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get((req, res) => {
    res.json({ message: "This is success" })
})

export default router.handler();