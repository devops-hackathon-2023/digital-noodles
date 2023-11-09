import {NextApiRequest, NextApiResponse} from "next";
import {container} from "tsyringe";
import {getSession} from "next-auth/react";
import {PrismaClient} from "@prisma/client";
import {AuthContext} from "@/backend/auth/AuthContext";
import { getServerSession } from "next-auth"
import {authOptions} from "../../../pages/api/auth/[...nextauth]";


export const auth = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const authProvider = container.resolve(AuthContext);
    const session = await getServerSession(req, res, authOptions);

    const prisma = container.resolve<PrismaClient>('PrismaClient');

    if(!session?.user) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email as string
        }
    })

    if(!user) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    authProvider.setUser(user);
    return next();
}