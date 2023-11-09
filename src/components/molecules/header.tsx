import {Input} from "@/components/atoms/input";
import {ProfileDropdownMenu} from "@/components/organisms/profile-dropdown-menu";
import {ModeToggle} from "@/components/atoms/mode-toggle";
import {usePathname} from "next/navigation";
import Link from "next/link";
import TeamSwitcher from "@/components/organisms/team-switcher";
import {Boxes, LayoutDashboard, Menu, Puzzle, Settings, User} from "lucide-react";

import {Button} from "@/components/atoms/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/avatar";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger} from "@/components/atoms/sheet";
import {Separator} from "@/components/atoms/separator";
import {useSession} from "next-auth/react";
import React from "react";

const Header = () => {
  const pathname = usePathname()
  const {data: session} = useSession()

  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return null;
  }

  return (
    <Sheet>
      <header
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className={"flex items-center gap-5"}>
            <Link href={"/"}><strong>DOPO</strong></Link>
            <div className={"hidden sm:flex items-center gap-2"}>
              <TeamSwitcher/>
              <Link href={"/app-modules"}>
                <Button variant={pathname === "/app-modules" ? "secondary" : "ghost"} className={"box-border"}>
                  App modules
                </Button>
              </Link>
              <Link href={"/deployment-units"}>
                <Button variant={pathname === "/deployment-units" ? "secondary" : "ghost"} className={"box-border"}>
                  Deployment units
                </Button>
              </Link>
            </div>
          </div>
          <div className={"flex sm:gap-4 items-center gap-2"}>
            <Input placeholder={"Search..."} className={'w-full'}/>
            <div className={"flex-shrink-0"}>
              <ModeToggle className={"hidden sm:flex"}/>
            </div>
            <ProfileDropdownMenu className={"hidden sm:flex"}/>
            <SheetTrigger asChild>
              <Button className={"sm:hidden"}>
                <Menu/>
              </Button>
            </SheetTrigger>
          </div>
        </div>
      </header>
      <SheetContent side={'bottom'}>
        <SheetHeader className={"flex items-start mb-4"}>
          <ModeToggle/>
        </SheetHeader>
        <div className={"flex w-full justify-between items-center pr-4"}>
          <div className={"font-bold"}>My Account</div>
          <Avatar>
            <AvatarImage src={session?.user?.image!}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <Separator/>
          <Link href={"/settings/profile"} className={"flex items-center gap-2"}>
            <User className="mr-2 h-4 w-4"/>
            <span>Profile</span>
          </Link>
          <Link href={"/settings"} className={"flex items-center gap-2"}>
            <Settings className="mr-2 h-4 w-4"/>
            <span>Settings</span>
          </Link>
        </div>
        <SheetFooter>
          <div className="flex flex-col gap-5 py-4">
            <div className={"flex w-full justify-between items-center pr-4"}>
              <div className={"font-bold"}>Navigations</div>
            </div>
            <Separator/>
            <Link href={"/"} className={"flex items-center gap-2"}>
              <LayoutDashboard className="mr-2 h-4 w-4"/>
              <span>Dashboard</span>
            </Link>
            <Link href={"/app-modules"} className={"flex items-center gap-2"}>
              <Puzzle className="mr-2 h-4 w-4"/>
              <span>App modules</span>
            </Link>
            <Link href={"/deployment-units"} className={"flex items-center gap-2"}>
              <Boxes className="mr-2 h-4 w-4"/>
              <span>Deployment units</span>
            </Link>
            <TeamSwitcher className={"w-full"}/>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default Header