import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function fetchUserAccount(user: any) {
  return await prisma.account.findFirst({
    where: {
      userId: user.id,
    },
  });
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  // session:{
  //   strategy:"jwt"
  // },
  // jwt: {
  //   encryption: true, // this is extremely important, because the Github accessToken is being stored inside the JWT.
  // },
  callbacks: {
    async session({
                    session,
                    token,
                    user
                  }: {
      session: any,
      token: any,
      user: any
    }) {
      const userAccount = await fetchUserAccount(user);
      // @ts-ignore
      session.accessToken = userAccount.access_token;
      return session;
    }
  },
  //   async jwt({token, user, account}:{token:any, user:any, account:any}){
  //     console.log("ahoj")
  //     console.log(token)
  //     return token
  //   }
  // }
}

export default NextAuth(authOptions)