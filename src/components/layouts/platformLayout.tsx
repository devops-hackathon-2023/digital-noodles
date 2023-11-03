import Header from "@/components/molecules/header";
import React, {ReactElement} from "react";
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import LoadingView from "@/components/organisms/loadingView";

interface PlatformLayoutProps {
  children: ReactElement
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({children}) => {
  const router = useRouter()
  const pathname = usePathname()
  const {status} = useSession({
    required: true,
    onUnauthenticated() {
      setTimeout(() => router.push("/login")
        , 700)
    },
  })

  if (status === "loading") {
    if (pathname === "/login") {
      return <div className="container flex min-h-screen justify-center items-center">
        <LoadingView/>
      </div>
    }
    return <div>

    </div>
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header/>
      <div className={"container mt-5 mb-5"}>
        {children}
      </div>
    </div>
  )
}

export default PlatformLayout