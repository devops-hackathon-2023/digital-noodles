import Link from "next/link";
import {cn} from "@/utils/lib/utils";
import {buttonVariants} from "@/components/atoms/button";
import Image from "next/image";
import dopo from "../../../public/dopo_portal.png";
import collaboration from "../../../public/colab.png";
import {UserAuthForm} from "@/components/organisms/user-auth-form";
import React from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { providers: object }

const LoginView: React.FC<UserAuthFormProps> = ({ providers }) => {
  return (
    <>
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
    </>
  )
}

export default LoginView