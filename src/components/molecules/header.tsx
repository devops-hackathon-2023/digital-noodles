import {Input} from "@/components/ui/input";
import {ProfileDropdownMenu} from "@/components/organisms/profile-dropdown-menu";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {usePathname} from "next/navigation";
import Link from "next/link";
import TeamSwitcher from "@/components/organisms/team-switcher";

const Header = () => {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return null;
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className={"flex items-center gap-5"}>
          <Link href={"/"}><strong>DOPO</strong></Link>
          <TeamSwitcher/>
        </div>
        <div className={"flex gap-4 items-center"}>
          <Input placeholder={"Search..."} className={'w-full'}/>
          <div className={"flex-shrink-0"}>
            <ModeToggle/>
          </div>
          <ProfileDropdownMenu/>
        </div>
      </div>
    </header>
  )
}

export default Header