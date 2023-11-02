import {UserAuthForm} from "@/components/organisms/user-auth-form";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import collaboration from "../public/colab.png"
import dopo from "../public/dopo_portal.png"
import {GetServerSidePropsContext, InferGetServerSidePropsType, NextPage} from "next";
import {getServerSession} from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]"
import {getProviders} from "next-auth/react";
import React from "react";

const Login: NextPage<{ providers: object }> = ({ providers })  => {
  return (
    <div
      className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/todo"
        className={cn(
          buttonVariants({variant: "ghost"}),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900"/>
        <div className="absolute top-1/2 left-1/2" style={{transform: "translate(-50%, -50%)"}}>
          <Image src={dopo} alt={"devops portal"}/>
        </div>
        <div className="relative z-20 mt-auto flex justify-center">
          <Image src={collaboration} alt={"s x digital|noodles"}/>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm providers={providers}/>
        </div>
      </div>
    </div>
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