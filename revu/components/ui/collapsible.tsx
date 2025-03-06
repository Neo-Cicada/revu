"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollapsibleProps {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const CollapsibleContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  open: false,
  setOpen: () => {},
})

export function Collapsible({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  ...props
}: CollapsibleProps & React.HTMLAttributes<HTMLDivElement>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  
  const setOpen = React.useCallback(
    (value: React.SetStateAction<boolean>) => {
      const newOpen = typeof value === "function" ? value(open) : value
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange, open]
  )
  
  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

interface CollapsibleTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export function CollapsibleTrigger({
  asChild = false,
  children,
  ...props
}: CollapsibleTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = React.useContext(CollapsibleContext)
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e)
    setOpen(!open)
  }
  
  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement>>
    return React.cloneElement(child, {
      ...props,
      onClick: handleClick,
    })
  }
  
  return (
    <button type="button" {...props} onClick={handleClick}>
      {children}
    </button>
  )
}

export function CollapsibleContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open } = React.useContext(CollapsibleContext)
  const ref = React.useRef<HTMLDivElement>(null)
  
  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden transition-all duration-200",
        open ? "max-h-96" : "max-h-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}