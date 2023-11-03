"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon, PlusCircledIcon,} from "@radix-ui/react-icons"

import {cn} from "@/utils/lib/utils"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog"

import {Popover, PopoverContent, PopoverTrigger,} from "@/components/atoms/popover"
import {Button} from "@/components/atoms/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/avatar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "@/components/atoms/command";
import {Input} from "@/components/atoms/input";
import {Label} from "@/components/atoms/label";
import {SasResponse} from "@/utils/types";
import {Skeleton} from "@/components/atoms/skeleton";
import {useSas} from "@/utils/SasContext";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {
}

export default function TeamSwitcher({className}: TeamSwitcherProps) {
  const {
    selectedSas,
    handleSas,
    allSasResponses,
    isLoading: currentSasLoading
  } = useSas();

  const [open, setOpen] = React.useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)

  if (currentSasLoading) {
    return (
      <div>
        <Skeleton className="h-5 w-[180px]"/>
      </div>
    )
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedSas?.id}.png`}
                alt={selectedSas?.name}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedSas?.name}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="sm:w-[200px] p-0 w-full">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search SAS..."/>
              <CommandEmpty>No team found.</CommandEmpty>
              {allSasResponses?.map((s: SasResponse) => (
                <CommandItem
                  key={s.id}
                  onSelect={() => {
                    handleSas(s)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${s.id}.png`}
                      alt={s.name}
                      className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {s.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedSas?.id === s.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator/>
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false)
                      setShowNewTeamDialog(true)
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5"/>
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new SAS</DialogTitle>
          <DialogDescription>
            Add a new team to manage deploys.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc."/>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
