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
        , 1300)
    },
  })


  if (status === "loading") {
    if (pathname === "/" || pathname === "/login") {
      return <div className="flex min-h-screen justify-center items-center  bg-[#18181b]">
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