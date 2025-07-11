'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ReactNode } from "react"



interface TooltipWrapperProps {
  label: string
  children: ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export default function TooltipWrapper({
  label,
  children,
  side = 'right',
  className = 'text-sm animate-fade-in',
}: TooltipWrapperProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
