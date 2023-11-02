import {ReactElement, useEffect, useState} from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator
} from "@/components/ui/command";
import {Input} from "@/components/ui/input";
import {Smile} from "lucide-react";

const CommandMenuProvider = ({children}: {
  children: ReactElement
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandGroup heading="Suggestions">
          {/*  <CommandItem>*/}
          {/*    <span>Calendar</span>*/}
          {/*  </CommandItem>*/}
          {/*  <CommandItem>*/}
          {/*    <span>Search Emoji</span>*/}
          {/*  </CommandItem>*/}
          {/*  <CommandItem>*/}
          {/*    <span>Calculator</span>*/}
          {/*  </CommandItem>*/}
          {/*</CommandGroup>*/}
          {/*<CommandSeparator />*/}
          {/*<CommandGroup heading="Settings">*/}
          {/*  <CommandItem>*/}
          {/*    <span>Profile</span>*/}
          {/*  </CommandItem>*/}
          {/*  <CommandItem>*/}
          {/*    <span>Settings</span>*/}
          {/*  </CommandItem>*/}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenuProvider