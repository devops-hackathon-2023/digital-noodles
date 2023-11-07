"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/utils/lib/utils";
import {buttonVariants} from "@/components/atoms/button";
import {LogOut} from "lucide-react";
import {signOut} from "next-auth/react";


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({
                             className,
                             items,
                             ...props
                           }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({variant: "ghost"}),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
      <div
        key={1}
        onClick={() => signOut()}
        className={cn(
          buttonVariants({variant: "ghost"}),
          "hover:bg-transparent hover:underline",
          "justify-start"
        )}
      >
        <LogOut className={"mr-2"}/>
        Log out
      </div>
    </nav>
  )
}
