import {Input} from "@/components/ui/input";
import {ProfileDropdownMenu} from "@/components/organisms/profile-dropdown-menu";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {usePathname} from "next/navigation";
import Link from "next/link";
import TeamSwitcher from "@/components/organisms/team-switcher";
import {Keyboard, Menu, Settings, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCallback, useState} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger} from "@/components/ui/sheet";
import {Separator} from "@/components/ui/separator";

const Header = () => {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login';

  const [isOpen, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleBottomSheet = useCallback(() => {
    setOpen(prevState => !prevState)
  }, [])

  if (isLoginPage) {
    return null;
  }

  return (
    <>
      <Sheet>
        <header
          className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className={"flex items-center gap-5"}>
              <Link href={"/"}><strong>DOPO</strong></Link>
              <TeamSwitcher className={"hidden sm:flex"}/>
            </div>
            <div className={"flex sm:gap-4 items-center gap-2"}>
              <Input placeholder={"Search..."} className={'w-full'}/>
              <div className={"flex-shrink-0"}>
                <ModeToggle className={"hidden sm:flex"}/>
              </div>
              <ProfileDropdownMenu className={"hidden sm:flex"}/>
              <SheetTrigger asChild>
                <Button className={"sm:hidden"} onClick={handleBottomSheet}>
                  <Menu/>
                </Button>
              </SheetTrigger>
            </div>
          </div>
        </header>
        <SheetContent side={'bottom'}>
          <SheetHeader>
            <div className={"flex w-full justify-between items-center pr-4"}>
              <div className={"font-bold"}>My Account</div>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-4 py-4">
            <Separator/>
            <div className={"flex items-center gap-2"}>
              <User className="mr-2 h-4 w-4"/>
              <span>Profile</span>
            </div>
            <div className={"flex items-center gap-2"}>
              <Settings className="mr-2 h-4 w-4"/>
              <span>Settings</span>
            </div>
            <Separator/>
            <ModeToggle/>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <TeamSwitcher className={"w-full"}/>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>

  )
}

export default Header