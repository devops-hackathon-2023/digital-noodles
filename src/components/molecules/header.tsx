import {Input} from "@/components/ui/input";
import {ProfileDropdownMenu} from "@/components/organisms/profile-dropdown-menu";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {usePathname} from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return null;
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link href={"/"}><strong>DOPO</strong></Link>
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