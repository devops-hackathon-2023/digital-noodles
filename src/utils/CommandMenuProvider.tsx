import React, {ReactElement, useEffect, useState} from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator
} from "@/components/atoms/command";
import axios from "axios";
import className from "classnames";
import Link from "next/link";
import {Boxes, Package} from "lucide-react";
import {Skeleton} from "@/components/atoms/skeleton";
import {Separator} from "@/components/atoms/separator";

const CommandMenuProvider = ({children}: {
  children: ReactElement
}) => {
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query: string) => {
    axios.get('/api/search', {
      params: {query}
    })
      .then(response => response.data)
      .then(setSearchResults);
  }

  // useEffect(() => {
  //   console.log(searchResults)
  // }, [searchResults]);


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

  const constructHref = (item: any) => {
    if (item.type === "SAS")
      return `/sases/${item.data.id}`

    if (item.type === "DEPLOYMENT_UNIT")
      return `/deployment-units/${item.data.id}`

    return "/"
  }

  const getIcon = (item: any) => {
    if (item.type === "SAS")
      return <Package className={"w-2 h-2"}/>

    if (item.type === "DEPLOYMENT_UNIT")
      return <Boxes className={"w-2 h-2"}/>

    return <div>No icon</div>
  }

  const getLabel = (item: any) => {
    if (item.type === "SAS")
      return "SAS"

    if (item.type === "DEPLOYMENT_UNIT")
      return "Deployment Unit"

    return "Unknown"
  }

  return (
    <>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput onValueChange={handleSearch} placeholder="Type the name of what you are looking for..."/>
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>SASes</span>
            </CommandItem>
            <CommandItem>
              <span>App Modules</span>
            </CommandItem>
            <CommandItem>
              <span>Deployment Units</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <Separator/>
        {
          searchResults.length > 0 ? <><CommandSeparator/>
              <CommandList>
                <CommandGroup>
                  {
                    searchResults.slice(0, 10).map((searchResult: any) => <Link href={constructHref(searchResult)}
                                                                                onClick={() => setOpen(false)}>
                      <CommandItem className={"flex gap-2"}>
                        <div>{searchResult.label}</div>
                        <div className={"w-1 h-1 bg-foreground rounded-xl"}></div>
                        <div className={"flex gap-2"}>
                          {getIcon(searchResult)}
                          <div className={className("text-sm")}>{getLabel(searchResult)}</div>
                        </div>
                      </CommandItem>
                    </Link>)
                  }
                </CommandGroup>
              </CommandList>
            </>
            :
            <Skeleton className={"w-[80%] h-4 m-2"}/>
        }
      </CommandDialog>
    </>
  )
}

export default CommandMenuProvider