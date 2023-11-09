import Header from "@/components/molecules/header";
import React, {ReactElement} from "react";
import {useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import LoadingView from "@/components/organisms/loadingView";
import {SidebarNav} from "@/components/organisms/settings/sidebar-nav";
import {Separator} from "@/components/atoms/separator";

interface SettingsLayoutProps {
  children: ReactElement
}


const sidebarNavItems = [
  {
    title: "Settings",
    href: "/settings",
  },
  {
    title: "Profile",
    href: "/settings/profile",
  },
]

const SettingsLayout: React.FC<SettingsLayoutProps> = ({children}) => {
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
    if (pathname === "/") {
      return <div className="container flex min-h-screen justify-center items-center bg-[#18181b]">
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
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6"/>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-1 lg:w-1/5">
            <SidebarNav items={sidebarNavItems}/>
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default SettingsLayout