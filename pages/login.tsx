import LoginLayout from "@/components/layouts/loginLayout";
import LoginView from "@/components/organisms/loginView";
import {GetServerSidePropsContext, NextPage} from "next";
import {getServerSession} from "next-auth";
import {getProviders} from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]"

const Login: NextPage<{ providers: object }> = ({ providers })  => {
  return (
    <LoginLayout>
      <LoginView providers={providers}/>
    </LoginLayout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/" } }
    }
    const providers = await getProviders()

    return {
        props: { providers: providers ?? [] },
    }
}

export default Login