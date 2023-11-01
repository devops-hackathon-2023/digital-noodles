import type { User } from "@prisma/client";
import {Lifecycle, container, injectable, scoped} from "tsyringe";

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class AuthContext {
    private user: User | null = null;

    getUser() : User | null {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }
}

const instance = container.register("AuthContext", AuthContext);